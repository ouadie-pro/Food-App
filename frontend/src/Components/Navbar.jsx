import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import { IoMenu } from "react-icons/io5";
import { RiMenu4Line } from "react-icons/ri";
import InputFrom from './InputFrom';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const links = [
    {id:0, name: "Home", path: "/" },
    {id:1, name: "Recipes", path: "/recipes" },
    {id:2, name: "About", path: "/about" },
    {id:3, name: "Contact", path: "/contact" },
    {id:4, name: "Login", path: "/login" }
  ]

  return (
    <>
     <header className="bg-white shadow-md relative z-20">
       <nav className="flex items-center justify-between sm:p-4 px-4 md:p-[15px]">
 
         {/* Logo */}
         <div className='logo'>
           <img src={Logo} alt="logo" className='w-[100px] md:w-[120px] h-[100px] md:h-[120px]' />
         </div>
 
         {/* Desktop Links */}
         <ul className="hidden md:flex list-none gap-3 mr-[25px]">
           {links.map((item) => (
             <li 
               key={item.id} 
               className={`${item.id === 4 ? "bg-[#ff9560]" : "hover:bg-[#ff9560]"} 
               text-[16px] md:text-[20px] p-2 rounded-[7px]`}
             >
               <button
                 onClick={() => {
                   if(item.name === "Login") setShowForm(true);
                 }}
                 className='text-[#ff5601] font-medium hover:text-white'
               >
                 {item.name}
               </button>
             </li>
           ))}
         </ul>
 
         {/* Hamburger Button */}
         <div className="md:hidden">
           <button 
             onClick={() => setIsOpen(!isOpen)}
             className="text-[#ff5601] text-3xl"
           >
             {isOpen ? <RiMenu4Line /> : <IoMenu />}
           </button>
         </div>
       </nav>
 
       {/* Mobile Menu */}
       {isOpen && (
         <ul className="flex flex-col md:hidden bg-white shadow-md p-4 gap-2">
           {links.map((item) => (
             <li 
               key={item.id} 
               className='text-[16px] p-2 hover:bg-[#ff9560] rounded-[7px]'
             >
               <button
                 onClick={() => {
                   if(item.name === "Login") setShowForm(true);
                   setIsOpen(false);
                 }}
                 className='text-[#ff5601] font-medium hover:text-white w-full text-left'
               >
                 {item.name}
               </button>
             </li>
           ))}
         </ul>
       )}
     </header>

     {/* ============ MODAL (InputForm) ============ */}
     {showForm && (
       <div 
         onClick={() => setShowForm(false)}
         className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50"
       >
         <div 
           onClick={(e)=>e.stopPropagation()}
           className="animate-fadeIn"
         >
           <InputFrom />
         </div>
       </div>
     )}

    </>
  )
}
