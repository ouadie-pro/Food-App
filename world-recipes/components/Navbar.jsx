'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenu, IoClose, IoRestaurantSharp } from "react-icons/io5";
import LoginModal from './LoginModal';

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLinkClick = (e, requiresAuth) => {
    if (requiresAuth && !isLoggedIn) {
      e.preventDefault();
      setIsLoginModalOpen(true);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', requiresAuth: false },
    { href: '/myRecipes', label: 'My Recipes', requiresAuth: true },
    { href: '/myFavRecipes', label: 'Favorites', requiresAuth: true },
    { href: '/contact', label: 'Contact', requiresAuth: false },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-orange-primary rounded-xl flex items-center justify-center shadow-button group-hover:scale-105 transition-transform">
                <IoRestaurantSharp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                World<span className="text-orange-primary">Recipes</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.requiresAuth && !isLoggedIn ? '/' : link.href}
                  onClick={(e) => handleLinkClick(e, link.requiresAuth)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-orange-primary text-white shadow-button'
                      : 'text-gray-600 hover:bg-orange-muted hover:text-orange-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleAuthAction}
                className={`ml-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isLoggedIn
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-orange-primary text-white hover:bg-orange-dark shadow-button hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {isLoggedIn ? 'Logout' : 'Sign In'}
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-orange-muted transition-colors"
            >
              {isMobileMenuOpen ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <IoMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in-up">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.requiresAuth && !isLoggedIn ? '/' : link.href}
                  onClick={(e) => {
                    handleLinkClick(e, link.requiresAuth);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-5 py-3 rounded-2xl text-base font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-orange-primary text-white'
                      : 'text-gray-600 hover:bg-orange-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleAuthAction();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-5 py-3 rounded-2xl text-base font-semibold transition-all duration-200 ${
                  isLoggedIn
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-orange-primary text-white hover:bg-orange-dark'
                }`}
              >
                {isLoggedIn ? 'Logout' : 'Sign In'}
              </button>
            </div>
          </div>
        )}
      </header>

      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)} 
          onLogin={() => setIsLoggedIn(true)} 
        />
      )}
    </>
  );
}