"use client";

import Header from '@/app/Sections/Header';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function MainMenuPage({ params }) {
    const { data: session } = useSession();
    if (!session) redirect("/");

    const { id } = params;
    const [reviewData, setReviewData] = useState({});

    const date = new Date(reviewData.datestart);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const date2 = new Date(reviewData.dateend);
    const formattedDate2 = date2.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const getReviewById = async (id) => {
        try {
            const res = await fetch(`/api/review/${id}`, {
                method: "GET",
                cache: "no-store"
            });

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await res.json();
            console.log("edit review: ", data);
            setReviewData(data.review);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReviewById(id);
    }, [id]);

    return (
        <div className="overflow-auto px-4">
            {/* Arrow Back */}
            <div className="text-2xl font-bold rounded-full hover:bg-gray-700 hover:text-white bg-white mx-5 mt-5 w-fit h-fit p-1 px-2 duration-300">
                <Link href="/component/MainMenu">&#8592;</Link>
            </div>

            <Header />
            
            <div className="bg-orange-200 bg-opacity-80 my-10 break-words p-5 rounded-lg lg:rounded-3xl max-w-full mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                    Title : <span className="text-gray-800 text-xl md:text-2xl">{reviewData.title}</span>
                </h1>
                <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                    Chapter : <span className="text-gray-800 font-medium text-lg md:text-xl">{reviewData.chapter}</span>
                </h1>
                <p className="text-xl md:text-2xl font-bold mb-4 md:mb-6 ">
                    Content : <span className="text-gray-800 font-medium text-base md:text-lg">{reviewData.content}</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <p className="text-base md:text-lg font-bold">
                        Started Reading at : <span className="text-gray-800 font-medium text-base md:text-lg">{formattedDate}</span>
                    </p>
                    <p className="text-base md:text-lg font-bold">
                        Finished Reading at : <span className="text-gray-800 font-medium text-base md:text-lg">{formattedDate2}</span>
                    </p>
                </div>
                <p className="text-lg md:text-xl font-bold mt-4 md:mt-6">
                    Rated : <span className="text-gray-800 font-medium text-base md:text-lg">{reviewData.rate}/10</span>
                </p>
                <p className="text-lg md:text-xl font-bold mt-4 md:mt-6">
                    Review By : <span className="text-gray-800 font-medium text-base md:text-lg">{reviewData.person}</span>
                </p>
            </div> 
        </div>
    )
}

export default MainMenuPage;
