import { useRef } from "react"
import { Input } from "../components/modal"
import { BACKEND_URL } from "../config"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup=()=>{
    const usernameref=useRef<HTMLInputElement>(null)
    const passwordref=useRef<HTMLInputElement>(null)
     const navigate=useNavigate()
    async function signup(){
        const username=usernameref.current?.value
        const password=passwordref.current?.value
        await axios.post(BACKEND_URL +'/api/v1/signup',{
            
                username,
                password
            
        })
        navigate("/signin")
        alert("you have signed up")
    }
    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        
        <div className="p-4 bg-white">
        <Input ref={usernameref} placeholder="Username"/>
        <br/>
        <Input ref={passwordref} placeholder="Password"/>
        <br/>
        <button onClick={signup} className="bg-violet-950  w-full p-2 text-white rounded mt-3">Signup</button>        
        </div>
    </div>
}