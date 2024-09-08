"use client"

import Header from '@/app/Sections/Header'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function CreateReviewPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session, router]);

    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Chapter, setChapter] = useState("");
    const [Start, setStart] = useState("");
    const [Finish, setFinish] = useState("");
    const [Rate, setRate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!Title || !Content || !Chapter || !Start || !Finish || !Rate ) {
            alert("Please complete all inputs!");
            return;
        }

        try {
            const res = await fetch("/api/review", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ Title, Content, Chapter, Start, Finish, User: session?.user?.name, Rate, UserEmail: session?.user?.email })
            });

            if (!res.ok) {
                throw new Error("Failed to create a review");
            }

            setTitle("");
            setContent("");
            setChapter("");
            setStart("");
            setFinish("");
            setRate("");

            router.push("/component/MainMenu");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create the review: " + error.message);
        }
    };

    return (
        <div className="mx-auto">
            {/* Arrow Back */}
            <div className="text-2xl font-bold rounded-full hover:bg-gray-700 hover:text-white bg-white  mx-5 mt-5 w-fit h-fit p-1 px-2 duration-300 "><Link className="" href="/component/MainMenu">&#8592;</Link></div>

            {/* Header */}
            <Header />
            <h1 className="flex w-fit mt-5 font-bold text-4xl gradient2-text mx-auto text-gray-300" style={{ textShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' }}>Create Reviews </h1>

            {/* Forms */}
            <form onSubmit={handleSubmit} className="hover:animated-outline w-[500px] max-w-[90vw] grid rounded-3xl py-5 pb-10 shadow-2xl m-10 mx-auto bg-opacity-50 hover:bg-opacity-100 bg-cyan-400 duration-1000 cursor-pointer hover:scale-105">

                {/* Title */}
                <h1 className="font-bold text-3xl mx-auto w-fit h-fit mt-2 gradient3-text">Title</h1>
                <input onChange={(e) => setTitle(e.target.value)} className="hover:animated-outline pr-10 pl-2 py-1 rounded-lg text-xl mx-auto w-fit h-fit mt-2 bg-gray-200" type="text" placeholder="Title of the Book" />

                {/* Content */}
                <h1 className="font-bold text-3xl mx-auto w-fit h-fit mt-2 gradient3-text">Content</h1>
                <textarea onChange={(e) => setContent(e.target.value)} className="hover:animated-outline pr-10 pl-2 py-1 rounded-lg w-[300px] text-xl mx-auto min-h-[50px] max-h-[150px] mt-2 bg-gray-200" placeholder="Content of the Book" />

                {/* Chapter */}
                <h1 className="font-bold text-3xl mx-auto w-fit h-fit mt-2 gradient3-text">Chapter</h1>
                <input onChange={(e) => setChapter(e.target.value)} className="hover:animated-outline pr-10 pl-2 py-1 rounded-lg text-xl mx-auto min-h-[50px] max-h-[150px] mt-2 bg-gray-200" type="text" placeholder="Chapter of the Book" />

                {/* Start and finish set */}
                <div className="grid grid-cols-2 mx-auto gap-x-3">

                    {/* Start */}
                    <div>
                        <h1 className="font-bold text-3xl w-fit h-fit mt-2 mx-auto gradient3-text">Start </h1>
                        <input onChange={(e) => setStart(e.target.value)} className="hover:animated-outline px-1 py-1 rounded-lg text-xl w-[160px] mx-auto min-h-[50px] max-h-[150px] mt-2 bg-gray-200" type="date" />
                    </div>

                    {/* Finish */}
                    <div>
                        <h1 className="font-bold text-3xl w-fit h-fit mt-2 mx-auto gradient3-text">Finish</h1>
                        <input onChange={(e) => setFinish(e.target.value)} className="hover:animated-outline px-1 py-1 rounded-lg text-xl w-[160px] mx-auto min-h-[50px] max-h-[150px] mt-2 bg-gray-200" type="date" />
                    </div>
                </div>

                {/* Rate */}
                
                    <h1 className="font-bold text-3xl w-fit h-fit mt-2 mx-auto gradient3-text">Rate</h1>
                    <input onChange={(e) => setRate(e.target.value)} className="hover:animated-outline px-1 py-1 rounded-lg text-xl w-[160px] mx-auto min-h-[50px] max-h-[150px] mt-2 bg-gray-200" type="number" min="1" max="10" placeholder="Rate the book" />

                {/* Submit Button */}
                <button type="submit" className="hover:animated-outline gradient2-bg w-fit mx-auto mt-7 px-4 py-1 rounded-xl font-bold text-green-700 hover:text-green-800 hover:scale-110 duration-300 ">Create Review</button>
            </form>
        </div>
    )
}

export default CreateReviewPage;


