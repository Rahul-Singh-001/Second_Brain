import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(){
   const [contents,setcontents]=useState<any[]>([])
      useEffect(()=>{
          axios.get(BACKEND_URL +'/api/v1/content',{
             headers:{
                "Authorization":sessionStorage.getItem("token")
             }
         })
          .then((response)=>
            setcontents(response.data.content))
      })
    return contents;
}