"use client"

import Link from "next/link";
import Header from "./Sections/Header";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  if (session) redirect("/component/MainMenu")

  return (
    <main className="">
       <Header />
        <div className="grid mx-auto max-w-[600px]">
             <ul className="mx-auto text-2xl text-center m-10">
             <Link href="/component/login"><li className="hover:animated-outline border-2 border-white py-2 px-20 font-bold m-5 hover:bg-gray-100 cursor-pointer bg-white rounded-2xl shadow-xl text-gray-700" style={{ textShadow:'5px 5px 10px rgba(0, 0, 0, 0.2)' }}>Login</li></Link>
             <Link href="/component/register"><li className="hover:animated-outline border-2 border-white py-2 px-20 font-bold m-5 hover:bg-gray-100 cursor-pointer bg-white rounded-2xl shadow-xl text-gray-700" style={{ textShadow:'5px 5px 10px rgba(0, 0, 0, 0.2)' }}>Register</li></Link>
             </ul>
        </div>
        
    </main>
  );
}
