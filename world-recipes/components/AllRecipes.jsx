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
        <div className="w-10 h-10 border-4 border-orange-primary border-t-transparent rounded-full animate-spin"></div>
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
    <div className="p-6 sm:p-8 lg:p-12 bg-orange-bg">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-primary mb-8">
        All Recipes
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {recipes.map((dat, index) => {
          const isFav = favorites.includes(dat._id);

          return (
            <div 
              key={index} 
              className="group bg-white rounded-[12px] shadow-md h-80 w-full xl:w-[250px] lg:w-[240px] sm:w-[220px] mx-auto overflow-hidden hover:translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-40">
                <img 
                  src={dat?.coverImage || '/placeholder.png'} 
                  alt={dat?.title} 
                  className="w-full h-full object-cover rounded-t-[12px]"
                />
                <button
                  onClick={() => toggleFavorite(dat._id)}
                  className="absolute top-2 right-2 p-1"
                >
                  <IoIosHeart className={`w-5 h-5 ${isFav ? 'text-orange-primary' : 'text-gray-400'}`} />
                </button>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-white group-hover:bg-orange-light transition-colors">
                  {dat?.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {Array.isArray(dat?.ingredients) ? dat.ingredients.join(", ") : dat?.ingredients}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}