"use client"

import React, { useState } from 'react'
import Header from '../../Sections/Header'
import Footer from '../../Sections/Footer'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const { data: session } = useSession();
    if (session) router.replace("/component/MainMenu");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });            
    
            if (res.error) {
                setError("Invalid credentials");
                return;
            }
    
            router.replace("/component/MainMenu"); // Replace with the correct URL path for the welcome page
    
        } catch(error) {
            console.error(error);
        }
    }

  return (
    <div className="">
        <Header/>
        <div className="">
            <h1 className="flex w-fit mt-5 font-bold text-4xl mx-auto text-red-300" style={{ textShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)' }}>Login </h1>
        </div>
        <form onSubmit={handleSubmit} className=" grid w-fit mx-auto mt-10 gap-y-5">

            {error && (
                <div className="font-bold text-sm text-red-500">
                    {error}
                </div>
            )}

            <input onChange={(e) => setEmail(e.target.value)} className="hover:animated-outline border-2 border-white pr-16 pl-1 py-1 rounded-xl font-bold" type="email" placeholder="ใส่ อีเมล ของคุณ"/>
            <input onChange={(e) => setPassword(e.target.value)} className="hover:animated-outline border-2 border-white pr-16 pl-1 py-1 rounded-xl font-bold" type="Password" placeholder="ใส่รหัสผ่านของคุณ"/>
            <button type='submit' className="bg-green-400 py-1 w-fit  px-4 rounded-xl font-bold text-green-800 hover:bg-green-500 transition-all shadow-2xl">Sign Up</button>
        </form>

        <div className="w-fit mx-auto py-5 text-gray-800">
            <Footer/>
        </div>
    </div>
  )
}

export default LoginPage
