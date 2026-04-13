'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/');
      return;
    }
    
    const fetchMyRecipes = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      
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
      <div className="p-6 sm:p-8 lg:p-12 min-h-[100vh]" style={{backgroundColor: '#fff7ed'}}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8" style={{color: '#ea580c'}}>
        My Recipes
      </h1>
      
      {myRecipes.length === 0 ? (
        <div className="bg-white rounded-[12px] shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No recipes found</p>
          <button
            onClick={() => router.push('/addRecipe')}
            className="mt-4 text-white font-semibold px-6 py-2 rounded transition-colors"
            style={{backgroundColor: '#ea580c'}}
          >
            Create Your First Recipe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {myRecipes.map((dat, index) => (
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
                <div className="absolute top-2 left-2 flex gap-2">
                  <button
                    onClick={() => router.push(`/editRecipe/${dat._id}`)}
                    className="p-1 text-gray-600 hover:text-orange-primary"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteHandler(dat._id)}
                    className="p-1 text-gray-600 hover:text-red-500"
                  >
                    <FaTrashAlt className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-white group-hover:bg-orange-light transition-colors">
                  {dat?.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {Array.isArray(dat?.ingredients) 
                    ? dat.ingredients.join(", ") 
                    : dat?.ingredients || "No ingredients"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}