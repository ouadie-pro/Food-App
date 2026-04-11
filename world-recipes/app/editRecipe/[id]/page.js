'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditRecipe() {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipe/${id}`);
        const res = response.data;
        setFormData({
          title: res.title,
          ingredients: res.ingredients.join(","),
          instructions: res.instructions,
          coverImage: null 
        });
      } catch (err) {
        console.error(err);
      }
    };
    if (id) getRecipe();
  }, [id]);

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "coverImage"
        ? e.target.files[0]
        : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("instructions", formData.instructions);
      formDataToSend.append("ingredients", JSON.stringify(formData.ingredients));
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      await axios.put(`/api/recipe/${id}/edit`, formDataToSend, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      router.push("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error uploading recipe");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[90%] max-w-md shadow-xl rounded-2xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center text-orange-600">
          Edit Recipe
        </h2>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 font-medium mb-1">Title</label>
          <input
            value={formData.title || ""}
            onChange={onHandleChange}
            type="text"
            name="title"
            className="border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Recipe title"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 font-medium mb-1">Ingredients</label>
          <textarea
            value={formData.ingredients || ""}
            onChange={onHandleChange}
            name="ingredients"
            className="border border-orange-300 rounded-lg px-3 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Separate ingredients with commas"
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 font-medium mb-1">Instructions</label>
          <textarea
            value={formData.instructions || ""}
            onChange={onHandleChange}
            name="instructions"
            className="border border-orange-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Write preparation steps..."
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 font-medium mb-1">Cover Image</label>
          {formData.coverImage && typeof formData.coverImage === "string" && (
            <img
              src={`/images/${formData.coverImage}`}
              alt="Current cover"
              className="h-32 mb-2 rounded"
            />
          )}
          <input
            onChange={onHandleChange}
            type="file"
            name="coverImage"
            className="border border-orange-300 rounded-lg px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md transition cursor-pointer"
        >
          Edit Recipe
        </button>
      </form>
    </div>
  );
}
