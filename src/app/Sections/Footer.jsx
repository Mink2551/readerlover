import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div ClassName="flex">
       <Link class="underline hover:text-gray-500 text-gray-700" href="/">Back to Home Page</Link>
    </div>
  )
}

export default Footer
