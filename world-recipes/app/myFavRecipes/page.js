'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosHeart } from "react-icons/io";

export default function MyFavRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);

    axios.get('/api/recipe')
      .then(res => {
        const filtered = res.data.filter(r => favs.includes(r._id));
        setRecipes(filtered);
      })
      .catch(err => console.error("Error fetching recipes:", err));
  }, []);

  const toggleFavorite = (id) => {
    const favs = favorites.filter(f => f !== id);
    setFavorites(favs);
    localStorage.setItem("favorites", JSON.stringify(favs));
    setRecipes(prev => prev.filter(r => r._id !== id));
  };

  return (
    <div className="p-6 sm:p-8 lg:p-12 bg-orange-light min-h-[100vh]">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
        My Favorite Recipes
      </h1>

      {recipes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-card p-12 text-center">
          <IoIosHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No favorite recipes yet</p>
          <p className="text-gray-400 text-sm mt-2">Start exploring and save your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((dat) => (
            <div
              key={dat._id}
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
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-500 hover:bg-white transition-colors"
                >
                  <IoIosHeart className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-orange-primary transition-colors">
                  {dat?.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {Array.isArray(dat?.ingredients)
                    ? dat.ingredients.join(", ")
                    : dat?.ingredients}
                </p>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                  {dat?.instructions}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}