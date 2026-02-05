import api from "@/lib/api";
import {create} from "zustand"
;

export interface Content{
    _id: string;
    title:string;
    body:string |string[];
    type:string;
    tags:string[];
    link?:string;
    userId:string;
    createdAt: string;
    updatedAt: string;
}
interface ContentState{
    contents: Content[]
    filteredContents:Content[]
    selectedType: string
    searchQuery: string
    isLoading:boolean
    error:string | null
    shareLink: string | null;
    //Actions
    fetchContents: ()=> Promise<void>;
    addContent: (
        content: Omit<Content,"_id"|"userId" |"createdAt"|"updatedAt">//You’re telling TypeScript: “This function accepts Content data EXCEPT database fields.”
    ) => Promise<void>
    // DTO(Data Transfer Object) vs              Entity
// Represents database structure |	Represents API data contract
// Used internally (backend)  |	Used externally (frontend / API input-output)
// Contains DB fields (_id, createdAt, etc.)  |	Contains only fields client should send/receive
// May include relations, methods, logic   |	Pure data (no logic)
// Tied to persistence layer  |	Tied to transport layer
    searchContents: (query: string) => void;
    deleteContent:(contentId : string) => Promise<void>
    filterByType:(type:string)=> void;
    manageShareLink:(share: boolean)=>Promise<void>
    clearError: ()=>void
    //Helper
    filterAndSearch:(
        contents:Content[],
        type?: string,
        query?: string
        )=> Content[]
}

export const useContentStore =create<ContentState>((set,get)=>({
    // Internally, create does:
// 1.Creates a global store
// 2.Stores initial state
// 3.Gives you:
// set → update state
// get → read state
// 4.Returns a hook connected to that store
// 5.Subscribes components automatically
    contents:[],
    filteredContents :[],
    selectedType:"all",
    searchQuery:"",
    isLoading:false,
    error:null,
    shareLink:null,
    
    fetchContents: async()=> {
        set({ isLoading : true ,error :null});
        try{
            const response= await api.get("/content")
// response contains:
// {
//   data: {...},        // actual payload (MOST IMPORTANT)
//   status: 200,
//   headers: {...},
//   config: {...}
// }
            const contents=response.data?.content ??[]
            set({
                contents,
                filteredContents:contents,
                isLoading: false,
            });
        } catch(error :any){
            set({
                error:error.response?.data?.msg || "Failed to fetch the contents",
                isLoading: false,
            })
        }
    },

    addContent: async (content)=>{
        set({
            isLoading:true,error:null
        })
        try{
            const response=await api.post("/content",content)
            const newContent=response.data.content;
            set((state)=>{
                const updatedContents =[newContent,...state.contents]
                return{
                    contents:updatedContents,
                    filteredContents: get().filterAndSearch(updatedContents),
                    isLoading: false,
                }
            });
        } catch(error:any){
            set({
                error:error.response?.data?.msg || "Failed to add content",
                isLoading:false,
            });
            
        }
    },
    deleteContent: async (contentId :string)=>{
        set({isLoading : true ,error :null})
        try{
            await api.delete(`/content/${contentId}`)
            set((state)=>{
                const updatedContents=state.contents.filter(
                    (c) => c._id !== contentId
                )
 // Update required on both backend and frontend,
// because after delete the UI relies on Zustand store
// and does not automatically refetch from the backend.
// ✅ Two Types of Updates (Frontend + Backend Sync)
// 1️⃣ Optimistic Update
// You update UI immediately, assuming backend will succeed.
// Flow: Update UI first → Call API
// Example:// removeFromStore(id);
           // await api.delete(id);
// Pros:
// ✅ Instant UI
// ✅ Smooth UX
// Cons:
// ❌ Must rollback if API fails

// 2️⃣ Pessimistic Update
// You wait for backend response first.
// Flow:
// Call API → Then update UI
// Example:
// await api.delete(id);
// removeFromStore(id);
// Pros:
// ✅ Always consistent with backend
// Cons:
// ❌ Slower UI

//  In my project  using: Pessimistic update
                return {
                    contents:updatedContents,
                    filteredContents:get().filterAndSearch(updatedContents),
                    isLoading:false,
                }
            })
        }catch(error:any){
            set({
                error:error.response?.data?.msg ||"Failed to delete content",
                isLoading: false
            })
        }
    },
    //after delete two common approaches
    // 1️⃣ Optimistic /Pessimistic update 
    // 2️⃣ Refetch (slower) from backend fetch the data
    filterByType:(type:string)=>{
        set((state)=>{
            const filtered=get().filterAndSearch(state.contents,type)
            return {selectedType: type,filteredContents: filtered}
        })
    },
    searchContents:(query: string) =>{
        set((state)=>{
            const filtered=get().filterAndSearch(
                state.contents,
                state.selectedType,
                query
            )
            return{ searchQuery: query ,filteredContents:filtered}
        })
    },
    
    manageShareLink: async(share: boolean)=>{
        set({ isLoading : true , error:null})
        try{
            const response =await api.post("/content/share",{ share })
            const hash=response.data.hash|| null;
            set({ shareLink:hash,isLoading: false})
        }catch(error:any){
            set({
                error:error.response?.data?.msg || "Failed to manage share link",
                isLoading:false
            })
        }
    },
    clearError:()=> set({error: null}),

    // Helper function - updated to include link in search
    filterAndSearch:(contents: Content[],type?:string,query?:string)=>{
        const currentType=type ?? get().selectedType;
        //nullish coalescing=>(??) means: Use the right value ONLY if the left is null or undefined.
        //after filtering type or searching query we store them in selectedType and searchQuery to work both searching and type selection simultaneously
        const currentQuery=query ?? get().searchQuery;
        let filtered=contents;

        // Filter by type
        if(currentType && currentType !== "all"){
            filtered=filtered.filter(
                (c)=> c.type.toLowerCase()===currentType.toLowerCase()
            )
        }
        //search-now includes link field
        if(currentQuery){
            const lowerQuery =currentQuery.toLowerCase()
            filtered=filtered.filter(
              (c)=>c.title.toLowerCase().includes(lowerQuery) ||
              (typeof c.body ==="string" ? c.body : c.body.join(" "))
              .toLowerCase().includes(lowerQuery) ||
              c.tags.some((tag)=>tag.toLowerCase().includes(lowerQuery))||
              (c.link && c.link.toLowerCase().includes(lowerQuery))
            )
        }
        return filtered
    }
}))