'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoArrowForward } from 'react-icons/io5';
import AllRecipes from '@/components/AllRecipes';
import LoginModal from '@/components/LoginModal';

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const handleAddRecipes = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/addRecipe');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-white to-orange-muted" />
        
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-orange-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-96 h-96 bg-orange-hover/10 rounded-full blur-3xl" />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-32 md:h-48">
            <path 
              fill="#FF6B35" 
              fillOpacity="0.08"
              d="M0,160L30,170.7C60,181,120,203,180,208C240,213,300,203,360,208C420,213,480,235,540,218.7C600,203,660,149,720,117.3C780,85,840,75,900,69.3C960,64,1020,64,1080,90.7C1140,117,1200,171,1260,197.3C1320,224,1380,224,1410,224L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-muted rounded-full mb-6">
                <span className="w-2 h-2 bg-orange-primary rounded-full animate-pulse-soft"></span>
                <span className="text-sm font-medium text-gray-700">Share Your Culinary Creations</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Share Your <span className="text-orange-primary">Passion</span> for Cooking
              </h1>
              
              <p className="text-gray-600 text-lg sm:text-xl mt-6 lg:mt-8 max-w-xl mx-auto lg:mx-0">
                Add your favorite recipes, discover amazing flavors from around the world, and connect with fellow food enthusiasts.
              </p>
              
              <button
                onClick={handleAddRecipes}
                className="mt-8 lg:mt-10 inline-flex items-center gap-2 bg-orange-primary hover:bg-orange-dark text-white text-lg font-semibold 
                  px-8 py-4 rounded-2xl shadow-button hover:shadow-lg hover:shadow-orange-primary/40 
                  transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                Add Recipes
                <IoArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex justify-center lg:justify-end animate-fade-in-up stagger-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-primary/20 to-orange-hover/20 rounded-3xl blur-2xl" />
                <img 
                  src="/images/MoroccanTajine.png" 
                  alt="Delicious Moroccan Tajine" 
                  className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] object-contain 
                    drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
      
      <AllRecipes />
    </div>
  );
}