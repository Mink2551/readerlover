"use client"

import Header from '../../Sections/Header'
import Footer from '../../Sections/Footer'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function RegisterPage() {
    const { data: session } = useSession();
    if (session) redirect("/component/MainMenu")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("");

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    
        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
    
        if (!name || !email || !password || !confirmPassword ) {
          setError("Please complete all input fields!");
          return;
        }
    
        try {
          const res = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
          });
    
          if (res.ok) {
            setSuccess("Registration successful!");
            e.target.reset();
          } else {
            const errorData = await res.json();
            setError(errorData.error || "User registration failed.");
          }
        } catch (error) {
          setError("Error during registration: " + error.message);
        }
      };    

  return (
    <div className="">
        <Header/>
        <div className="">
            <h1 className="flex w-fit mt-5 font-bold text-4xl mx-auto text-gray-300" style={{ textShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)' }}>Register </h1>
        </div>
        <form onSubmit={handleSubmit} className=" grid w-fit mx-auto mt-10 gap-y-5">

            {error && (
                <div className="font-bold text-sm text-red-500">
                    {error}
                </div>
            )}

            {success && (
                <div className="font-bold text-lime-400">
                    {success}
                </div>
            )}

            <input onChange={(e) => setName(e.target.value)} className="hover:animated-outline border-2 border-white pr-16 pl-3 py-1 rounded-xl font-bold" type="text" placeholder="Enter Your Username"/>
            <input onChange={(e) => setEmail(e.target.value)} className="hover:animated-outline border-2 border-white pr-16 pl-3 py-1 rounded-xl font-bold" type="email" placeholder="Enter Your Email"/>
            <input onChange={(e) => setPassword(e.target.value)} className="hover:animated-outline border-2 border-white pr-16 pl-3 py-1 rounded-xl font-bold" type="Password" placeholder="Enter Your Password"/>
            <input onChange={(e) => setConfirmPassword(e.target.value)} className="hover:animated-outline border-2 border-white pr-16 pl-3 py-1 rounded-xl font-bold" type="Password" placeholder="Confirm Password"/>
            <div>
                <button type='submit' className="bg-green-400 py-1 w-fit mx-auto px-4 rounded-xl font-bold text-green-800 hover:bg-green-500 transition-all shadow-2xl">Sign Up</button>
            </div>
        </form>
        
        <div className="w-fit mx-auto py-5 text-gray-800">
            <Footer/>
        </div>
    </div>
  )
}

export default RegisterPage