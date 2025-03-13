import React from 'react'
import { CgMenuLeft } from "react-icons/cg";
import { FaPhoneAlt, FaHeart } from 'react-icons/fa';

function NavBar() {
  return (
    <header className="w-3/4 h-30 bg-white flex justify-between items-center">
          <div className="w-1/4 h-full flex items-center justify-start gap-2">
            <CgMenuLeft className="text-3xl"/>  
            <h1 className="text-3xl">BOOKSHELF.</h1>
          </div>
          <div className="w-1/4 h-full flex items-center justify-end gap-2">
            <p className="inline-flex items-center space-x-1"><FaPhoneAlt /> <span>0489632596 </span><FaHeart /></p>
          </div>
    </header>
  )
}

export default NavBar