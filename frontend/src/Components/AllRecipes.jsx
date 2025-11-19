import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosHeart } from "react-icons/io";
export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null);     // حالة الخطأ

  useEffect(() => {
    axios.get('http://localhost:5000/recipe')
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
    <div
    className='p-[2rem] bg-[#fff3e6] min-h-[100vh]'>
      <h1>
        All Recipes
      </h1>

      <div
      className='flex flex-wrap gap-[1.5rem] justify-center'>
        {recipes.map((dat, index) => (
          <div 
            key={index} 
            className='group bg-[#fff] rounded-[12px] shadow-lg transition-all duration-300 ease-out hover:translate-y-1
            w-[300px] cursor-pointer hover:bg-[#ff9560] hover:text-white p-2 relative'
          >
            <h4
            className='mb-[0.5rem] text-[#ff6347] group-hover:text-black'>{dat?.title}</h4>
            <p className='my-[0.2rem]'>
              {Array.isArray(dat?.ingredients) 
                ? dat.ingredients.join(", ") 
                : dat?.ingredients || "No ingredients"}
            </p>
            <small className='my-[0.2rem]'>{dat?.instructions || "No instructions"}</small>
            <div
            className='absolute top-1 right-1 flex gap-1 text-[24px] text-[#ff9560]'>
                <IoIosHeart />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
