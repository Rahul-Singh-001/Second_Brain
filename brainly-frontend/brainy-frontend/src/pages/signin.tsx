import { useRef } from "react"
import { Input } from "../components/modal"
import { BACKEND_URL } from "../config"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Signin=()=>{
    const usernameref=useRef<HTMLInputElement>(null)
    const passwordref=useRef<HTMLInputElement>(null)
    const navigate=useNavigate()
    async function signin(){
        const username=usernameref.current?.value
        const password=passwordref.current?.value
        const response=await axios.post(BACKEND_URL +'/api/v1/signin',{
            
                username,
                password
            
        })
        const jwt=response.data.token
        localStorage.setItem("token",jwt)
        navigate("/dashboard")
    }
    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        
        <div className="p-4 bg-white">
        <Input ref={usernameref} placeholder="Username"/>
        <br/>

        <Input ref={passwordref} placeholder="Password"/>
        <br/>
        <button onClick={signin} className="bg-violet-950 text-white  w-full p-2 rounded mt-3">Signin</button>        
        </div>
    </div>
}