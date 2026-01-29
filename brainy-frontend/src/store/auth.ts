import api from "@/lib/api";
import { create } from "zustand"
import { jwtDecode } from "jwt-decode";

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
    //Hydration means: Loading saved state from browser storage back into your app.
//in this project used Zustand persist.
// 1.login
// 2.Zustand saves data to sessionStorage
// Later…
// 3.when You refresh the page
// 4.Zustand reads that saved data
// 5.Zustand puts it back into the store
// That step (4 → 5) is called: HYDRATION

// ⚠️ Why hydration causes bugs
// Because hydration is NOT instant.
// For a short moment:
// isAuthenticated = false   (default)
// Then after hydration:
// isAuthenticated = true

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
                    // store token in Storage for API interceptor
                    sessionStorage.setItem("token",token)
                    const decoded:any = jwtDecode(token);//Get user info from backend or JWT token.not from frontend like (user: { id: "", username })
                  
                    //Decode username from response or token
                    set({
                        token,
                        isAuthenticated:true,
                          user: {
                            id: decoded.id,
                            username: decoded.username
                          },
                        isLoading:false
                    })
                } catch(error:any){
                    set({
                        error: error.response?.data?.msg || "Login failed",
                        isLoading: false,
                    });
                     throw error; //Without this: signup never knows login failed.
                }
      },

      signup: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.post("/users/signup", { username, password });
          
          // IMPORTANT: small delay so DB commits the new user asYour /signup API probably returns:201 Created
          // but your backend may not commit user immediately (or transaction delay).
          await new Promise(res => setTimeout(res, 300));

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
// eg 1:User clicks login → isLoading=true
// User refreshes page before login finishes.
// Now Zustand rehydrates:
// isLoading: true
// Spinner stays forever 
//eg 2:whrn error is stored then everytime
// You just opened the page…
// But error already shows:
// ❌ even before typing
// ❌ even before clicking login
// Looks broken 

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
//on refresh
// 1️⃣ JS memory is wiped(JS memory is temporary storage that holds data while the current page/app is running.)
// Your Zustand store starts fresh:
// user: null
// token: null
// isAuthenticated: false
// hasHydrated: false
// ⚠️ This is TEMPORARY.

// 2️⃣ persist middleware reads storage
// Zustand does internally:
// sessionStorage.getItem("auth-storage")
// Finds:
// {
//   token,
//   user,
//   isAuthenticated
// }

// 3️⃣ Zustand injects this into store
// Now state becomes:
// user: {...}
// token: "..."
// isAuthenticated: true
// 🔥 THIS moment = HYDRATION.

// 4️⃣ onRehydrateStorage fires
// Your code:
// onRehydrateStorage: () => (state) => {
//   state?.setHasHydrated();
// }

// Runs AFTER hydration.

// So:
// hasHydrated = true;

// WHY hasHydrated EXISTS?
// Because between step 1 and step 3:
// isAuthenticated = false
// React sees this and may:
// ❌ redirect to login
// ❌ flash auth page
// ❌ blank screen