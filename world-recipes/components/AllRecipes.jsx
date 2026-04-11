'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoHeart, IoHeartOutline } from "react-icons/io5";

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
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-orange-primary/30 border-t-orange-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Discover <span className="text-orange-primary">Recipes</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore delicious recipes from home cooks around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {recipes.map((dat, index) => {
            const isFav = favorites.includes(dat._id);
            const hasImage = dat?.coverImage && dat.coverImage !== '/placeholder.png';

            return (
              <article 
                key={dat._id || index}
                className="group bg-white rounded-3xl shadow-card overflow-hidden transition-all duration-500 
                  hover:shadow-card-hover hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden bg-cream-200">
                  {hasImage ? (
                    <img 
                      src={dat.coverImage} 
                      alt={dat.title} 
                      className="w-full h-full object-cover transition-transform duration-500 
                        group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-muted to-cream-200">
                      <span className="text-6xl">🍲</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(dat._id);
                    }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 
                      ${isFav 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white hover:scale-110'
                      }`}
                  >
                    {isFav ? (
                      <IoHeart className="w-5 h-5" />
                    ) : (
                      <IoHeartOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-orange-primary transition-colors">
                    {dat?.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {Array.isArray(dat?.ingredients) ? dat.ingredients.slice(0, 3).join(", ") : dat?.ingredients}
                    {(Array.isArray(dat?.ingredients) && dat.ingredients.length > 3) && "..."}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-gray-400 text-xs">
                    <span className="w-1.5 h-1.5 bg-orange-primary rounded-full"></span>
                    <span>View Recipe</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}