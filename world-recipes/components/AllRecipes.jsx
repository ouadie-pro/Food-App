'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

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
    <div className="p-6 sm:p-8 lg:p-12 bg-orange-light">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
        All Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((dat, index) => {
          const isFav = favorites.includes(dat._id);

          return (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-card overflow-hidden transition-all duration-300 
                hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={dat?.coverImage || '/placeholder.png'} 
                  alt={dat?.title} 
                  className="w-full h-full object-cover transition-transform duration-300 
                    group-hover:scale-105"
                />
                <button
                  onClick={() => toggleFavorite(dat._id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 
                    ${isFav 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
                    }`}
                >
                  {isFav ? (
                    <IoIosHeart className="w-5 h-5" />
                  ) : (
                    <IoIosHeartEmpty className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-orange-primary transition-colors">
                  {dat?.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {Array.isArray(dat?.ingredients) ? dat.ingredients.join(", ") : dat?.ingredients}
                </p>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                  {dat?.instructions}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}