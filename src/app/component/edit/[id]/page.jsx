"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/app/Sections/Header'
import { useRouter } from 'next/navigation'

function EditPage({ params }) {

    const { id } = params;

    const [reviewData, setReviewData]= useState({});

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const router = useRouter();

    const getReviewById = async (id) => {
        try {
            const res = await fetch(`/api/review/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if(!res.ok) {
                throw new Error("Failed to fetch a error");
            }

            const data = await res.json();
            console.log("edit review: ", data);
            setReviewData(data.review);

        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        getReviewById(id);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`/api/review/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ newTitle, newContent })
            });
            
    
            if (!res.ok) {
                throw new Error("Failed to update a review");
            }

            router.refresh();
            router.push('/component/MainMenu');
    
        } catch (error) {
            console.log(error);
        }
    };
    

  return (
    <div>
      {/* Arrow Back */}
      <div className="text-2xl font-bold rounded-full hover:bg-gray-700 hover:text-white bg-white  mx-5 mt-5 w-fit h-fit p-1 px-2 duration-300 "><Link className="" href="/component/MainMenu">&#8592;</Link></div>

      {/* Header */}
      <Header />
      <h1 className="flex w-fit mt-5 font-bold text-4xl gradient2-text mx-auto text-gray-300" style={{ textShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' }}>Edit Reviews </h1>

      {/* Forms */}
      <form onSubmit={handleSubmit} className="hover:animated-outline w-[500px] max-w-[90vw] grid rounded-3xl py-5 pb-10 shadow-2xl m-10 mx-auto bg-opacity-50 hover:bg-opacity-100 bg-cyan-400 duration-500 cursor-pointer hover:scale-105">

        {/* Title */}
        <h1 className="font-bold text-3xl mx-auto w-fit h-fit mt-2 gradient3-text">New Title</h1>
        <input
         onChange={(e) => setNewTitle(e.target.value)}
            className="hover:animated-outline pr-10 pl-2 py-1 rounded-lg text-xl mx-auto w-fit h-fit mt-2 bg-gray-200"
            type="text"
            placeholder={reviewData.title || "Title"}
        />
        
        {/* Content */}
        <h1 className="font-bold text-3xl mx-auto w-fit h-fit mt-2 gradient3-text">New Content</h1>
        <textarea
            onChange={(e) => setNewContent(e.target.value)}
            className="hover:animated-outline pr-10 pl-2 py-1 rounded-lg w-[300px] text-xl mx-auto min-h-[50px] max-h-[150px] mt-2 bg-gray-200"
            placeholder={reviewData.content || "Content of the Book"}
        />
        
        
        
        {/* Submit Button */}
        <button type="submit" className="hover:animated-outline gradient2-bg w-fit mx-auto mt-7 px-4 py-1 rounded-xl font-bold text-green-700 hover:text-green-800 hover:scale-110 duration-300 ">Edit Review</button>
        </form>

    </div>
  )
}

export default EditPage
