"use client"

import Header from '@/app/Sections/Header'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


function AccountPage() {
    const { data: session } = useSession();
    if (!session) redirect("/")

    const handleLogout = () => {
        signOut({ callbackUrl: '/' }); 
    }

  return (
    <div className="mx-auto">
      <div className="text-2xl font-bold rounded-full hover:bg-gray-700 hover:text-white bg-white mx-5 mt-5 w-fit h-fit p-1 px-2 duration-300 "><Link className="" href="/component/MainMenu">&#8592;</Link></div>
      <Header/>
      <ul className="mx-auto grid mt-10 hover:animated-outline border-2 bg-white  rounded-3xl max-w-[350px] w-[80vw]">
         <li className="font-bold mt-5 mx-5 h-fit flex text-xl">Username : <p className="font-light text-sm my-auto mt-1.5 ml-2">{session?.user?.name}</p></li>
         <li className="font-bold mt-5 mx-5 h-fit flex text-xl">Email : <p className="font-light text-sm my-auto mt-1.5 ml-2">{session?.user?.email}</p></li>
         <li className="font-bold mt-5 mx-5 h-fit flex text-xl">Role : <p className="font-light text-sm my-auto mt-1.5 ml-2">User</p></li>
         <li 
             className="bg-red-500 duration-500 hover:scale-110 w-fit px-3 py-1 rounded-xl m-5 text-gray-200 cursor-pointer font-bold" 
             onClick={handleLogout}>
           <a>Logout</a>
         </li>
      </ul>
    </div>
  )
}

export default AccountPage
