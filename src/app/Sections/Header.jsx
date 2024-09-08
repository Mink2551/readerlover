import React from 'react'
import Image from 'next/image'
import RLLOGO from "./../../../public/Readerlover Logo.png"

function Header() {
  return (
    <div>
       <div className="max-w-[600px] mx-auto grid">
             <Image src={RLLOGO} className="mx-auto mt-10 rounded-3xl " width={200} height={500}/>
             <h1 className="mx-auto mt-5 font-bold text-5xl gradient-text " style={{ textShadow:'5px 5px 5px rgba(0, 0, 0, 0.2)' }}>Reader Lover</h1>
        </div>
    </div>
  )
}

export default Header
