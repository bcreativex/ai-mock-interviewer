"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect,useState } from 'react'
import QuesetionSection from './_components/QuesetionSection';

function StartInterview({params}) {
   
    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    useEffect(()=>{
        GetInterviewDetails();
    },[]);
    //  used to get interview details by mockid/interviewid
   const GetInterviewDetails=async()=>{
    const result=await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,params.interviewId))

     const jsonMockResp=JSON.parse(result[0].jsonMockResp);
     console.log(jsonMockResp)
     setMockInterviewQuestion(jsonMockResp);
     setInterviewData(result[0]);

   }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
      {/* Questions  */}
      <QuesetionSection  mockInterviewQuestion={mockInterviewQuestion}/>

      {/* video/ audio recording  */}


      </div>
    </div>
  )
}

export default StartInterview