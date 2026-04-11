'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

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
    <div className='p-[2rem] bg-[#fff3e6] min-h-[100vh]'>
      <h1 className='text-2xl font-bold text-[#ff5601] pb-4'>
        My Favorite Recipes ❤️
      </h1>

      <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[2rem]'>
        {recipes.map((dat) => (
          <div
            key={dat._id}
            className='group h-80 bg-[#fff] rounded-[12px] shadow-lg transition-all duration-300 ease-out
            hover:translate-y-1 xl:w-[250px] lg:w-[240px] sm:w-[220px] cursor-pointer
            hover:bg-[#ff9560] hover:text-white p-2 relative'
          >
            <img
              src={`/images/${dat.coverImage}`}
              alt={dat.title}
              className='w-full h-40 object-cover rounded-[8px] mx-auto'
            />

            <div className='overflow-y-scroll h-[120px] mt-2 pr-1'>
              <h4 className='text-[#ff6347] group-hover:text-black font-semibold'>
                {dat.title}
              </h4>

              <p className='text-sm'>
                {Array.isArray(dat.ingredients)
                  ? dat.ingredients.join(", ")
                  : dat.ingredients}
              </p>

              <small className='text-xs block'>
                {dat.instructions}
              </small>
            </div>

            <div
              onClick={() => toggleFavorite(dat._id)}
              className='absolute top-1 right-1 text-[24px] cursor-pointer text-red-500 group-hover:text-white'
            >
              <MdDelete />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
