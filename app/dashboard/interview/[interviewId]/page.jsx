"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {

  const [InterviewData,setInterviewData]=useState();
  const [webCamEnabled,setWebCamEnabled]=useState(false);

   useEffect(()=>{
      console.log(params.interviewId)
      GetInterviewDetails();
   },[])
  
  //  used to get interview details by mockid/interviewid
   const GetInterviewDetails=async()=>{
    const result=await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,params.interviewId))

    setInterviewData(result[0])
   }
  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div>
        {webCamEnabled? <Webcam
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        mirrored={true}
        style={{
          height:300,
          width:300
        }}
        />
        :
        <>
        <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
        <Button  onClick={()=>setWebCamEnabled(true)}>Enable WebCam and Microphone</Button>
        </>
        } 
        </div>

        <div className='flex flex-col my-5 gap-5'>
         
              <h2 className='text-lg'><strong>Job Role/Job Position: </strong>{InterviewData.jobPosition}</h2>
              <h2 className='text-lg'><strong>Job Description/Tech Stack: </strong>{InterviewData.jobDesc}</h2>
              <h2 className='text-lg'><strong>Years of Experience: </strong>{InterviewData.jobExperience}</h2>
        </div>
          
    </div>
        
  )
}

export default Interview
