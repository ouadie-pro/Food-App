import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import { IoMenu } from "react-icons/io5";
import { RiMenu4Line } from "react-icons/ri";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/recipes" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ]

  return (
    <header className="bg-white shadow-md">
      <nav className="flex items-center justify-between sm:p-4 px-4 md:p-[15px]">

        {/* Logo */}
        <div className='logo'>
          <img src={Logo} alt="logo" className='w-[100px] md:w-[120px] h-[100px] md:h-[120px]' />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex list-none gap-3 mr-[25px]">
          {links.map((item, index) => (
            <li 
              key={index} 
              className='text-[16px] md:text-[20px] p-1 md:p-[15px] transition-all duration-300 hover:bg-[#ff9560] rounded-[7px] '
            >
              <a 
                href={item.path} 
                className='no-underline text-[#ff5601] font-medium hover:text-white'
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#ff5601] focus:outline-none sm:text-4xl text-2xl"
          >
            {isOpen ? (
              <RiMenu4Line />
            ) : (
              <IoMenu />
            )}
          </button>
        </div>

      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col md:hidden bg-white shadow-md p-4 gap-2">
          {links.map((item, index) => (
            <li 
              key={index} 
              className='text-[16px] p-2 transition-all duration-300 hover:bg-[#ff9560] rounded-[7px]'
            >
              <a href={item.path} className='no-underline text-[#ff5601] font-medium hover:text-white'>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
