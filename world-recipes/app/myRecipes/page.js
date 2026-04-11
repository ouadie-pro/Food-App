'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoHeart, IoHeartOutline, IoRestaurantOutline } from "react-icons/io5";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data } = await axios.get('/api/recipe');
        const filtered = data.filter(recipe => recipe.createdBy === user._id);
        setMyRecipes(filtered);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRecipes();
  }, []);

  const onDeleteHandler = async (id) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;
    
    try {
      await axios.delete(`/api/recipe/${id}/delete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMyRecipes(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error deleting recipe");
    }
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 lg:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              My <span className="text-orange-primary">Recipes</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your personal recipe collection
            </p>
          </div>
          <button
            onClick={() => router.push('/addRecipe')}
            className="inline-flex items-center justify-center gap-2 bg-orange-primary hover:bg-orange-dark 
              text-white font-semibold px-6 py-3 rounded-2xl shadow-button hover:shadow-lg 
              hover:shadow-orange-primary/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <IoRestaurantOutline className="w-5 h-5" />
            Create Recipe
          </button>
        </div>
        
        {myRecipes.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-card p-12 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-orange-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
              <IoRestaurantOutline className="w-10 h-10 text-orange-primary" />
            </div>
            <p className="text-gray-500 text-lg mb-2">No recipes yet</p>
            <p className="text-gray-400 text-sm mb-6">Start sharing your culinary creations!</p>
            <button
              onClick={() => router.push('/addRecipe')}
              className="bg-orange-primary hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-2xl 
                shadow-button hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <IoRestaurantOutline className="w-5 h-5" />
              Create Your First Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {myRecipes.map((dat, index) => {
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
                    
                    <div className="absolute top-3 left-3 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/editRecipe/${dat._id}`);
                        }}
                        className="p-2.5 rounded-full bg-white/90 text-gray-600 hover:text-orange-primary 
                          hover:bg-white hover:scale-110 transition-all duration-300"
                        title="Edit Recipe"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteHandler(dat._id);
                        }}
                        className="p-2.5 rounded-full bg-white/90 text-gray-600 hover:text-red-500 
                          hover:bg-white hover:scale-110 transition-all duration-300"
                        title="Delete Recipe"
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-orange-primary transition-colors">
                      {dat?.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {Array.isArray(dat?.ingredients) 
                        ? dat.ingredients.slice(0, 3).join(", ") 
                        : dat?.ingredients || "No ingredients"}
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