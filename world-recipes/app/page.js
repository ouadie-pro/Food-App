'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AllRecipes from '@/components/AllRecipes';
import LoginModal from '@/components/LoginModal';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const addRecipes = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/addRecipe');
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div>
      <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 gap-8 lg:gap-12">
        <div className="text-center lg:text-left max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Share Your <span className="text-orange-primary">Passion</span> for Cooking
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mt-4 lg:mt-6 leading-relaxed">
            Add your favorite recipes, discover new flavors, and connect with 
            food lovers from all over the world.
          </p>
          <button
            onClick={addRecipes}
            className="mt-6 lg:mt-8 bg-orange-primary hover:bg-orange-dark text-white text-lg font-semibold 
              px-8 py-3 rounded-xl transition-all duration-300 shadow-button hover:shadow-lg 
              hover:-translate-y-0.5 cursor-pointer"
          >
            Add Recipes
          </button>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img 
            src="/images/MoroccanTajine.png" 
            alt="Delicious food" 
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] object-contain 
              animate-fade-in-up"
          />
        </div>
      </section>

      <div className="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="#ff6b35" 
            d="M0,160L30,170.7C60,181,120,203,180,208C240,213,300,203,360,208C420,213,480,235,540,218.7C600,203,660,149,720,117.3C780,85,840,75,900,69.3C960,64,1020,64,1080,90.7C1140,117,1200,171,1260,197.3C1320,224,1380,224,1410,224L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>

      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
      <AllRecipes />
    </div>
  );
}