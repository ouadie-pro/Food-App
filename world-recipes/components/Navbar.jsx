'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import { RiMenu4Line } from "react-icons/ri";
import LoginModal from './LoginModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("token"));
  }, []);

  const checkLogin = () => {
    if (isLogin) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleLinkClick = (e, isAuthRequired) => {
    if (!isAuthRequired || isLogin) return;
    e.preventDefault();
    setIsOpen(true);
  };

  const navLinks = [
    { href: '/', label: 'Home', authRequired: false },
    { href: '/myRecipes', label: 'My Recipes', authRequired: true },
    { href: '/myFavRecipes', label: 'Favorite', authRequired: true },
    { href: '/contact', label: 'Contact', authRequired: false },
  ];

  return (
    <>
      <header className='bg-white shadow-md relative z-20'>
        <nav className='flex items-center justify-between sm:p-4 px-4 md:p-[15px]'>
          <div>
            <Link href="/">
              <img src="/images/logo.png" alt="logo" className='w-[100px] md:w-[120px] h-[100px] md:h-[120px]' />
            </Link>
          </div>
          <ul className='hidden md:flex list-none gap-3 mr-[25px]'>
            {navLinks.map((link) => (
              <li
                key={link.href + link.label}
                className='text-[16px] md:text-[20px] p-2 rounded-[7px] hover:bg-[#ff9560]'
              >
                <Link
                  href={link.authRequired && !isLogin ? '/' : link.href}
                  onClick={(e) => handleLinkClick(e, link.authRequired)}
                  className='text-[#ff5601] font-medium hover:text-white'
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <button
              className='text-[16px] md:text-[20px] p-2 rounded-[7px] bg-[#ff9560] text-[#ff5601] font-medium hover:text-white cursor-pointer'
              onClick={checkLogin}
            >
              {isLogin ? "Logout" : "Login"}
            </button>
          </ul>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#ff5601] text-3xl"
            >
              {isMenuOpen ? <RiMenu4Line /> : <IoMenu />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <ul className="md:hidden flex flex-col bg-white shadow-md p-4 space-y-3 animate-slideDown">
            {navLinks.map((link) => (
              <li
                key={link.href + link.label}
                className="p-2 rounded-lg hover:bg-[#ff9560] transition"
              >
                <Link
                  href={link.authRequired && !isLogin ? '/' : link.href}
                  onClick={(e) => {
                    handleLinkClick(e, link.authRequired);
                    setIsMenuOpen(false);
                  }}
                  className="text-[#ff5601] hover:text-white font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <button
              onClick={() => { checkLogin(); setIsMenuOpen(false); }}
              className="w-full p-2 rounded-lg bg-[#ff9560] text-[#ff5601] hover:text-white font-medium"
            >
              {isLogin ? "Logout" : "Login"}
            </button>
          </ul>
        )}
      </header>

      {isOpen && <LoginModal onClose={() => setIsOpen(false)} onLogin={() => setIsLogin(true)} />}
    </>
  );
}