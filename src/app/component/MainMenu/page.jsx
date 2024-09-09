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
      <Header/>
      <div className="mx-auto grid w-fit mb-16 mt-16">
        <Link href="/component/ReviewBoard" className="gradient-bg hover:animated-outline duration-300 mt-5 font-bold text-lg text-center hover:scale-105 hover:text-gray-100 cursor-pointer hover:text-xl text-gray-300 hover:gradient-hover px-16 py-2 rounded-full shadow-2xl">Review Board</Link>
        <Link href="/component/CreateReview" className="gradient-bg hover:animated-outline duration-300 mt-5 font-bold text-lg text-center hover:scale-105 hover:text-gray-100 cursor-pointer hover:text-xl text-gray-300 hover:gradient-hover px-16 py-2 rounded-full shadow-2xl">Create Review</Link>
        <Link href="/component/htu" className="gradient-bg hover:animated-outline duration-300 mt-5 font-bold text-lg text-center hover:scale-105 hover:text-gray-100 cursor-pointer hover:text-xl text-gray-300 hover:gradient-hover px-16 py-2 rounded-full shadow-2xl">How to use</Link>
        <Link href="/component/Account" className="gradient-bg hover:animated-outline duration-300 mt-5 font-bold text-lg text-center hover:scale-105 hover:text-gray-100 cursor-pointer hover:text-xl text-gray-300 hover:gradient-hover px-16 py-2 rounded-full shadow-2xl">My account</Link>
      </div>      
    </div>
  )
}

export default MainMenuPage
