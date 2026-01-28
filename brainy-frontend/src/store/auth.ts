import api from "@/lib/api";
import { create } from "zustand"
import { persist,createJSONStorage } from "zustand/middleware";
interface User {
    id: string
    username: string
}
interface AuthState {
    user: User | null
    token: string |null
    isAuthenticated: boolean
    isLoading:boolean
    error: string | null
    hasHydrated: boolean 
    //Actions
    login:(username:string,password:string)=>Promise<void>
    signup:(username:string ,password: string)=>Promise<void>
    logout: ()=>void
    clearError:()=>void
    setHasHydrated :() => void
}
export const useAuthStore =create<AuthState>()(
    persist(
        (set,get)=>({
            user :null,
            token:null,
            isAuthenticated:false,
            isLoading:false,
            error:null,
            hasHydrated: false,
            setHasHydrated: () => set({ hasHydrated: true }),
      
            login: async(username:string,password:string)=>{
                set({ isLoading: true,error:null})
                try{
                    const response=await api.post("/users/signin",{
                        username,
                        password
                    })
                    const { token }=response.data
                    // store token in LocalStorage for API interceptor
                    sessionStorage.setItem("token",token)

                    //Decode username from response or token
                    set({
                        token,
                        isAuthenticated:true,
                        user:{id: "",username},
                        isLoading:false
                    })
                } catch(error:any){
                    set({
                        error: error.response?.data?.msg || "Login failed",
            isLoading: false,
          });
          
        }
      },

      signup: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.post("/users/signup", { username, password });
          // After successful signup, automatically login
          await get().login(username, password);
        } catch (error: any) {
          set({
            error: error.response?.data?.msg || "Signup failed",
            isLoading: false,
          });
          
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {// without partialize Zustand will save everything from persist:isLoading ❌ error ❌ temporary UI state ❌ This causes: .stale loading state after refresh .error messages reappearing .bad UX
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state: AuthState | undefined) => {
       state?.setHasHydrated();
       
      },  
    }
  
  )
);