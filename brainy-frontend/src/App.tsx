// import { useState } from 'react'

import { DeleteIcon, Share2 } from "lucide-react"
import { Twittericon } from "./icons/twittericon"



function App() {
  return (
    <div className="min-h-screen bg-pink-600 ">
    <div className="bg-orange-500 text-white border rounded-md shadow-md hover:shadow-2xl w-72">
         <div className="flex justify-around items-center">
            <div className="flex p-1 text-white gap-2">
            <Twittericon size="lg"/>
            <span className="border rounded-lg px-1  "> twitter</span>
            </div>
            <div className="flex gap-2">
              <DeleteIcon />
               <Share2/>
            </div>
     </div>
      <div className="border m-1 h-20 rounded-sm p-1">
         content in
      </div>
      <div className="flex justify-end p-1">
           mm/dd/yy
      </div>

    </div>
    </div>
  )
}

export default App
