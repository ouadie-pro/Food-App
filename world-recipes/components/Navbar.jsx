'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenu, IoClose } from "react-icons/io5";
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

  const handleLinkClick = (e, isAuthRequired, href) => {
    if (!isAuthRequired || isLogin) {
      return;
    }
    e.preventDefault();
    setIsOpen(true);
  };

  const navLinks = [
    { href: '/', label: 'Home', authRequired: false },
    { href: '/myRecipes', label: 'My Recipes', authRequired: true },
    { href: '/myFavRecipes', label: 'Favorite', authRequired: true },
    { href: '/contact', label: 'Contact', authRequired: false },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <img 
                  src="/images/logo.png" 
                  alt="World Recipes" 
                  className="w-20 h-20 md:w-24 md:h-24"
                />
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.authRequired && !isLogin ? '/' : link.href}
                    onClick={(e) => handleLinkClick(e, link.authRequired, link.href)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 
                      ${isActive(link.href) 
                        ? 'bg-orange-primary text-white shadow-button' 
                        : 'text-gray-700 hover:bg-orange-light hover:text-orange-primary'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={checkLogin}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer 
                    ${isLogin 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-orange-primary text-white hover:bg-orange-dark shadow-button'
                    }`}
                >
                  {isLogin ? 'Logout' : 'Login'}
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-orange-light transition"
              >
                {isMenuOpen ? <IoClose className="w-6 h-6" /> : <IoMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 animate-slide-down">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.authRequired && !isLogin ? '/' : link.href}
                  onClick={(e) => {
                    handleLinkClick(e, link.authRequired, link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 
                    ${isActive(link.href) 
                      ? 'bg-orange-primary text-white' 
                      : 'text-gray-700 hover:bg-orange-light'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  checkLogin();
                  setIsMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 
                  ${isLogin 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-orange-primary text-white hover:bg-orange-dark'
                  }`}
              >
                {isLogin ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
        )}
      </header>

      {isOpen && <LoginModal onClose={() => setIsOpen(false)} onLogin={() => setIsLogin(true)} />}
    </>
  );
}