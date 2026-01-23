// import { useState } from 'react'

import { useState } from 'react'

import { Button } from '../components/button'
import { Card } from '../components/card'
import { Modal } from '../components/modal'
import { Plusicon } from '../icons/plusicon'
import { Shareicon } from '../icons/shareicon'
import { Sidebar } from '../components/sidebar'
import { useContent } from '../hooks/useContent'
import { Brain } from '../icons/brain'



export function Dashboard() {
  const content=useContent();
  const [modalopen,setmodalopen]=useState(false)
   const [sideopen,setsideopen]=useState(true)
  return (
    <>
    <div className='h-10 flex items-center space-x-2 border-b px-3'> 
                <Brain size="xlg"/>
                <span className="text-xl font-semibold"> Second Brain</span>
    </div>
    
    <div className='flex h-screen'>
    <Sidebar open={sideopen}  onClose={()=>{
      setsideopen(c=>!c)
      }}/>
    
  <div className="flex-1 flex flex-col">
    <Modal open={modalopen} onClose={()=>{
      setmodalopen(false)
      }}/>
    <div className=' min-h-screen '>
      <div className="flex justify-end space-x-6 h-16  border-b">
          <div className='flex  items-center m-4 gap-4 '>
        <Button 
        variant='secondary'  
        size='md'  
        endIcon={<Shareicon size='md'/>
        }
        text={"share"}/>
      <Button 
      variant='primary' 
      size='lg' 
      startIcon={<Plusicon size='lg'/>} 
      onClick={()=>{setmodalopen(true)}}
      text={
      <div > 
      Add Content
      </div>}/>
      </div>
    </div>
    <div className='flex'>
       
      </div>
    </div>
      <div className='flex  items-center gap-8 flex-wrap'>
        {content?.map(({type,title,link})=>
          <Card  headerimage={type} HeadingText={title} content={link}/>
        )}
    
      </div>
     </div>
     </div>
     
    </>
  )
}


