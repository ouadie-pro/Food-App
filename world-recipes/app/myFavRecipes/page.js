'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoHeartOutline } from "react-icons/io5";

export default function MyFavRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);

    axios.get('/api/recipe')
      .then(res => {
        const filtered = res.data.filter(r => favs.includes(r._id));
        setRecipes(filtered);
      })
      .catch(err => console.error("Error fetching recipes:", err))
      .finally(() => setLoading(false));
  }, []);

  const toggleFavorite = (id) => {
    const favs = favorites.filter(f => f !== id);
    setFavorites(favs);
    localStorage.setItem("favorites", JSON.stringify(favs));
    setRecipes(prev => prev.filter(r => r._id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-primary/30 border-t-orange-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-cream-100 via-white to-orange-muted py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            My <span className="text-orange-primary">Favorites</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Your saved recipe collection
          </p>
        </div>

        {recipes.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-card p-12 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-orange-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
              <IoHeartOutline className="w-10 h-10 text-orange-primary" />
            </div>
            <p className="text-gray-500 text-lg mb-2">No favorite recipes yet</p>
            <p className="text-gray-400 text-sm">Start exploring and save your favorites!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {recipes.map((dat, index) => {
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
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 text-red-500 
                        hover:bg-white hover:scale-110 transition-all duration-300"
                      title="Remove from favorites"
                    >
                      <IoHeartOutline className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-orange-primary transition-colors">
                      {dat?.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {Array.isArray(dat?.ingredients)
                        ? dat.ingredients.slice(0, 3).join(", ")
                        : dat?.ingredients}
                      {(Array.isArray(dat?.ingredients) && dat.ingredients.length > 3) && "..."}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}