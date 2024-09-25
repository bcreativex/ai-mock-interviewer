"use client"
import React,{useState} from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
  


function AddNewInterview() {
    const [openDialog,setOpenDialog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExperience,setJobExperience]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const {user}=useUser();

    const onSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
       console.log(jobPosition,jobDesc,jobExperience)

       const InputPrompt= "Job Position: "+jobPosition+",Job Description: "+jobDesc+", Job Experience: "+jobExperience+", Depends on the Job Position, Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question along with Answer in JSON format, Give us question and answer field on JSON"
       
       const result=await chatSession.sendMessage(InputPrompt);
       const MockJsonResp= (result.response.text()).replace('```json','').replace('```','')
       console.log(JSON.parse(MockJsonResp));
       setJsonResponse(MockJsonResp);
  
       if(MockJsonResp){
       const resp=await db.insert(MockInterview)
       .values({
        mockId:uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDesc,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')

       }).returning({mockId:MockInterview.mockId})
       console.log("Inserted ID:",resp)
       if(resp)
       {
         setOpenDialog(false);
       }
      }
      else{
        console.log("ERROR");
      }
       setLoading(false);
      }
  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
      onClick={()=>setOpenDialog(true)}>
      <h2 className=' text-lg text-center transition-all'>+ Add New</h2>
      </div>

            <Dialog open={openDialog}>
        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
               <div>
                <h2>Add Detials about your job position/role, job Description and years of Experience</h2>
                <div className='mt-7 my-3'>
                    <label>Job Role/ Job Position</label>
                    <Input placeholder="Ex. Full Stack Developer" required 
                     onChange={(event)=>setJobPosition(event.target.value)} />
                   
                </div>
                <div className=' my-3'>
                    <label>Job Description/Tech Stack</label>
                    <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc." required
                     onChange={(event)=>setJobDesc(event.target.value)}/>
                </div>
                <div className=' my-3'>
                    <label>Years of Experience</label>
                    <Input placeholder="Ex. 3" type='number'  max="40" required
                     onChange={(event)=>setJobExperience(event.target.value)}/>
                </div>
               </div>
                <div className='flex gap-5 justify-end'>
                    <Button type='button' variant='ghost'onClick={()=>setOpenDialog(false)}>Cancel</Button>
                    <Button type='submit'disabled={loading}>
                      {loading?<>
                      <LoaderCircle className='animate-spin'/> 'Generating from AI'
                      </>:'Start Interview' 
                    }
                     </Button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>


    </div>
  )
}

export default AddNewInterview
