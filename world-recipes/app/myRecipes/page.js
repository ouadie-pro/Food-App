'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      
      try {
        const { data } = await axios.get('/api/recipe');
        const filtered = data.filter(recipe => recipe.createdBy === user._id);
        setMyRecipes(filtered);
      } catch (error) {
        console.error("Error fetching recipes:", error);
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

  return (
    <div className="p-6 sm:p-8 lg:p-12 bg-orange-light min-h-[100vh]">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
        My Recipes
      </h1>
      
      {myRecipes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-card p-12 text-center">
          <p className="text-gray-500 text-lg">No recipes found</p>
          <button
            onClick={() => router.push('/addRecipe')}
            className="mt-4 bg-orange-primary hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-xl shadow-button hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            Create Your First Recipe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myRecipes.map((dat, index) => (
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
                <div className="absolute top-3 left-3 flex gap-2">
                  <button
                    onClick={() => router.push(`/editRecipe/${dat._id}`)}
                    className="p-2 rounded-full bg-white/90 text-gray-600 hover:text-orange-primary hover:bg-white transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteHandler(dat._id)}
                    className="p-2 rounded-full bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white transition-colors"
                  >
                    <FaTrashAlt className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-orange-primary transition-colors">
                  {dat?.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {Array.isArray(dat?.ingredients) 
                    ? dat.ingredients.join(", ") 
                    : dat?.ingredients || "No ingredients"}
                </p>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                  {dat?.instructions || "No instructions"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}