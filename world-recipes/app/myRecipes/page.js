'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoIosHeart } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
    try {
      const resp = await axios.delete(`/api/recipe/${id}/delete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMyRecipes(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error deleting recipe");
    }
  };

  return (
    <div className='p-[2rem] bg-[#fff3e6] min-h-[100vh]'>
      <h1 className='text-2xl font-bold text-[#ff5601] pb-4'>
        My Recipes
      </h1>
      
      {myRecipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[2rem]'>
          {myRecipes.map((dat, index) => (
            <div 
              key={index} 
              className='group overflow-y-scroll h-80 bg-[#fff] rounded-[12px] shadow-lg transition-all duration-300 ease-out 
              hover:translate-y-1 xl:w-[250px] lg:w-[240px] sm:w-[220px] cursor-pointer 
              hover:bg-[#ff9560] hover:text-white p-2 relative'
            >
              <div className='flex p-1 justify-end text-xl gap-2'>
                <FaEdit 
                  className='text-[#ff9560] group-hover:text-white cursor-pointer'
                  onClick={() => router.push(`/editRecipe/${dat._id}`)}
                />
                <MdDelete 
                  className='text-[#ff9560] group-hover:text-white cursor-pointer'
                  onClick={() => onDeleteHandler(dat._id)}
                />
              </div>
              
              <img 
                src={`/images/${dat?.coverImage}`} 
                alt="" 
                className='h-40 w-full object-cover rounded-[8px]'
              />
              
              <h4 className='sm:mb-[0.5rem] text-[#ff6347] group-hover:text-black font-semibold'>
                {dat?.title}
              </h4>
              
              <p className='sm:my-[0.2rem]'>
                {Array.isArray(dat?.ingredients) 
                  ? dat.ingredients.join(", ") 
                  : dat?.ingredients || "No ingredients"}
              </p>
              
              <small className='my-[0.2rem]'>{dat?.instructions || "No instructions"}</small>
              
              <div className='absolute top-1 left-1 flex gap-1 text-[24px] text-[#ff9560]'>
                <IoIosHeart className='text-[#ff9560] group-hover:text-white'/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
