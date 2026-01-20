import { useRef, useState } from "react";
import { CrossIcon } from "../icons/crossicon"
import { Button } from "./button"
import { BACKEND_URL } from "../config";
import axios from "axios";

type ModalProps = {
  open: boolean;
  onClose: () => void;
};
enum ContentType {
   Youtube="youtube",
   Twitter="twitter"
}
export const Modal = ({ open, onClose }: ModalProps) => {
   const titleref=useRef<HTMLInputElement>(null)
   const linkref=useRef<HTMLInputElement>(null)
   const [type,settype]=useState(ContentType.Youtube)
   async function addContent(){
        const title=titleref.current?.value
        const link=linkref.current?.value
        await axios.post(BACKEND_URL +'/api/v1/content',{
             link,
             title,
             type
        },{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        })
   }
    return <div>
         {open && <div className="h-screen w-screen bg-opacity-80 bg-slate-700 fixed top-0 left-0 flex justify-center items-center" onClick={onClose}>
               <div className="p-2  border border-border bg-background  rounded-md opacity-100"  onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end">
                     <div onClick={onClose} className="cursor-pointer">
                     <CrossIcon size="lg"/>
                     </div>
                     </div>
                          <Input ref={titleref} placeholder={"give title"} />
                          <br/>
                          
                          <Input ref={linkref} placeholder={"give content"}/>
                          <div className="border-2 m-1 rounded">
                               <div className=" flex justify-center text-xl font-semibold mb-1">Type</div>
                               <div className="flex gap-1 p-1">
                                 <Button size='md' text="Youtube" variant={type===ContentType.Youtube? "primary": "secondary"} onClick={()=>settype(ContentType.Youtube)}/>
                                 <Button size='md' text="Twitter" variant={type===ContentType.Twitter? "primary": "secondary"} onClick={()=>settype(ContentType.Twitter)}/>
                                    
                               </div>
                          </div>
                          <div className="flex justify-center mt-1">
                        <Button onClick={addContent} variant='primary' size='md' text={'Submit'}/>
                     </div>
                  </div>
            </div>
            }   
    </div>
    
}
interface inputtypes{
   placeholder:string,
   onChange?:()=>void,
   ref:any
}
export function Input(props:inputtypes){
   return <input type="text" ref={props.ref} onChange={props.onChange} placeholder={props.placeholder} className=" rounded p-2 m-1 border-2"/>
}