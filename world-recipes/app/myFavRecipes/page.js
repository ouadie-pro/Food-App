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
    <div className="p-6 sm:p-8 lg:p-12 bg-orange-bg min-h-[100vh]">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-primary mb-8">
        My Favorite Recipes
      </h1>

      {recipes.length === 0 ? (
        <div className="bg-white rounded-[12px] shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No favorite recipes yet</p>
          <p className="text-gray-400 text-sm mt-2">Start exploring and save your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recipes.map((dat) => (
            <div
              key={dat._id}
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
                  <IoIosHeart className="w-5 h-5 text-orange-primary" />
                </button>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-white group-hover:bg-orange-light transition-colors">
                  {dat?.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {Array.isArray(dat?.ingredients)
                    ? dat.ingredients.join(", ")
                    : dat?.ingredients}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}