"use client"

import Header from '@/app/Sections/Header'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import DeleteBtn from '@/app/Deletebtn';


function MainMenuPage({ params }) {
    const { data: session } = useSession();
    if (!session) redirect("/")

    const [reviewData, setReviewData] = useState([]);
    const { id } = params;
    const router = useRouter();

    const getReview = async () => {
      try {
        const res = await fetch("/api/review", {
          method: "GET",
          cache: "no-store"
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch review");
        }
  
        const data = await res.json();
        setReviewData(data.review);
  
      } catch (error) {
        console.log("Error loading review: ", error);
      }
    }

    useEffect(() => {
      getReview();
    }, []);

  return (
    <div className="mx-auto">
      <div className="text-2xl font-bold rounded-full hover:bg-gray-700 hover:text-white bg-white mx-5 mt-5 w-fit h-fit p-1 px-2 duration-300 "><Link className="" href="/component/MainMenu">&#8592;</Link></div>
      <Header/>
      <h1 className="flex w-fit mt-5 font-bold text-4xl gradient2-text mx-auto text-gray-300" style={{ textShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' }}>Reviews Board</h1>
      <div className="min-h-[90vh] m-5 mt-10 rounded-3xl shadow-2xl">
        {/* Review show */}
               <hr className="my-5 w-[90%] mx-auto"/>
               <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
               {reviewData && reviewData.length > 0 ? (
                   reviewData.map(val => (
                     <div key={val._id} className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-80 max-h-80 my-5 mx-auto">
                       {/* Title */}
                       <h4 className="m-3 text-2xl text-gray-800 font-bold">
                         Title: {val.title.length > 16 ? `${val.title.substring(0, 13)}...` : val.title}
                       </h4>
               
                       {/* Content */}
                       <div className="m-3 text-md max-w-[300px] h-[170px] text-gray-700" style={{ wordWrap: 'break-word' }}>
                         <p className="font-bold w-fit">Content :</p> 
                         {val.content.length > 200 ? `${val.content.substring(0, 200)}...` : val.content}
                       </div>
               
                      <div className="flex">
                         {/* Read Button */}
                       <div className="mt-5 m-3 flex">             
                           <Link href={`/component/read/${val._id}`} className="bg-green-500 text-white border py-1 px-4 rounded-md text-md w-fit">
                             Read
                           </Link>
                       </div>

                        {/* Edit Button */}
                        <div className="mt-5 m-3 flex">
                         {session?.user?.email === val.useremail && (
                           <Link href={`/component/edit/${val._id}`} className="bg-gray-500 text-white border py-1 px-3 rounded-md text-md w-fit">
                             Edit
                           </Link>
                         )}
                       </div>

                        {/* Delete Button */}
                        <div className="mt-5 m-3 flex">
                         {session?.user?.email === val.useremail && (
                          <DeleteBtn id={val._id}/>
                         )}
                       </div>
                      </div>
                     </div> 
                   ))
               ) : (
                   <div className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-80 my-5 mx-auto">
                       <p className="m-3">Do not have any Reviews yet.</p>
                   </div>
               )}
               </div>
               
        </div> 
    </div>
  )
}

export default MainMenuPage
