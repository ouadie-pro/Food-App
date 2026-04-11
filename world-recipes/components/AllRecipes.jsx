'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosHeart } from "react-icons/io";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    axios.get('/api/recipe')
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes.");
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id) => {
    let favs = [...favorites];

    if (favs.includes(id)) {
      favs = favs.filter(f => f !== id);
    } else {
      favs.push(id);
    }

    setFavorites(favs);
    localStorage.setItem("favorites", JSON.stringify(favs));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-[#ff9560] text-lg">Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className='p-[2rem] bg-[#fff3e6] min-h-[100vh]'>
      <h1 className='text-2xl font-bold text-[#ff5601] pb-1'>
        All Recipes
      </h1>

      <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[2rem]'>
        {recipes.map((dat, index) => {
          const isFav = favorites.includes(dat._id);

          return (
            <div 
              key={index} 
              className='group h-80 bg-[#fff] rounded-[12px] shadow-lg transition-all duration-300 ease-out 
              hover:translate-y-1 xl:w-[250px] lg:w-[240px] sm:w-[220px] cursor-pointer 
              hover:bg-[#ff9560] hover:text-white p-2 relative'
            >
              <img 
                src={dat?.coverImage || '/placeholder.png'} 
                alt={dat?.title} 
                className='w-full h-40 object-cover rounded-[8px] mx-auto'
              />

              <div className='overflow-y-scroll h-[120px] mt-2 pr-1'>
                <h4 className='text-[#ff6347] group-hover:text-black font-semibold'>
                  {dat?.title}
                </h4>

                <p className='text-sm'>
                  {Array.isArray(dat?.ingredients) ? dat.ingredients.join(", ") : dat?.ingredients}
                </p>

                <small className='text-xs block'>
                  {dat?.instructions}
                </small>
              </div>

              <div
                onClick={() => toggleFavorite(dat._id)}
                className={`absolute top-1 right-1 text-[24px] cursor-pointer 
                ${isFav ? "text-red-500" : "text-[#ff9560]"} 
                group-hover:text-white`}
              >
                <IoIosHeart />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}