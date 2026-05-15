import { useAuthStore } from "@/store/auth"
import axios from "axios"
//It uses an environment variable if available, otherwise falls back to localhost.
// VITE_API_URL is a frontend variable that tells Axios where your backend lives.
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://second-brain-c5qm.onrender.com/api/v1";
// import.meta.env=> This is Vite’s way of accessing environment variables.
// process.env => in Node.
const api =axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type": "application/json",
    },
})
//Request interceptor to add auth token
api.interceptors.request.use(
    (config)=>{
        const token=sessionStorage.getItem("token")
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);// means -“This async operation has failed.”
    }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(error.response?.status===401 || error.response?.status === 403){
            // Backend says token is invalid → update frontend state
      useAuthStore.getState().logout();
           
        }
        return Promise.reject(error)
    }
)
export default api