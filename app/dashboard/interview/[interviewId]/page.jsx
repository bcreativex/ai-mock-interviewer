"use client"
import React, { useEffect } from 'react'

function Interview({params}) {

   useEffect(()=>{
      console.log(params.interviewId)
   },[])

  return (
    <div>
      Interview
    </div>
  )
}

export default Interview
