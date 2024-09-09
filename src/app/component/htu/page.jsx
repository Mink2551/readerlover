"use client"

import Header from '@/app/Sections/Header'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


function MainMenuPage() {
    const { data: session } = useSession();
    if (!session) redirect("/")

  return (
    <div>
      {/* Arrow Back */}
      <div className="text-2xl font-bold rounded-full hover:bg-gray-700 hover:text-white bg-white  mx-5 mt-5 w-fit h-fit p-1 px-2 duration-300 "><Link className="" href="/component/MainMenu">&#8592;</Link></div>

      {/* Header */}
      <Header />
      <h1 className="flex w-fit mt-5 font-bold text-4xl text-red-300 mx-auto " style={{ textShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' }}>How to use </h1>
      <div className="mx-10">
        <div className="w-fit mx-auto text-center my-10">
           <h3 className="text-gray-800 font-bold text-3xl">View Board</h3>
           <p className="text-gray-700 my-5">เป็นพื้นที่แสดงความคิดเห็นของผู้อ่าน</p>
           <h3 className="text-gray-800 font-bold text-3xl">Create review</h3>
           <li className="text-gray-700 my-5">Title ระบุชื่อเรื่อง</li>
           <li className="text-gray-700 my-5">Content แสดงความคิดเห็นที่ได้จากหนังสือที่อ่าน</li>
           <li className="text-gray-700 my-5">Chapter ระบุตอนของหนังสือ</li>
           <li className="text-gray-700 my-5">Start-Finish ระบุวันที่เริ่มและเสร็จสิ้นการอ่าน</li>
           <li className="text-gray-700 my-5">Rate ให้คะเเนนความชอบของผู้อ่าน</li>
           <h3 className="text-gray-800 font-bold text-3xl">My account</h3>
           <p className="text-gray-700 my-5">หน้าต่างแสดงข้อมูลของผู้อ่าน</p>
        </div>
      </div>
    </div>
  )
}

export default MainMenuPage
