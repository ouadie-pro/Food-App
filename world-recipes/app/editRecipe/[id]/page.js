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
      alert("Error updating recipe");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg shadow-card rounded-2xl p-8 flex flex-col gap-5"
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Recipe
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your culinary creation
          </p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Title</label>
          <input
            value={formData.title || ""}
            onChange={onHandleChange}
            type="text"
            name="title"
            className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-primary transition-colors"
            placeholder="Recipe title"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Ingredients</label>
          <textarea
            value={formData.ingredients || ""}
            onChange={onHandleChange}
            name="ingredients"
            className="border border-gray-200 rounded-xl px-4 py-3 h-28 resize-none focus:outline-none focus:border-orange-primary transition-colors"
            placeholder="Separate ingredients with commas"
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Instructions</label>
          <textarea
            value={formData.instructions || ""}
            onChange={onHandleChange}
            name="instructions"
            className="border border-gray-200 rounded-xl px-4 py-3 h-32 resize-none focus:outline-none focus:border-orange-primary transition-colors"
            placeholder="Write preparation steps..."
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Cover Image</label>
          {formData.coverImage && typeof formData.coverImage === "string" && (
            <img
              src={`/images/${formData.coverImage}`}
              alt="Current cover"
              className="h-32 w-full object-cover mb-3 rounded-xl"
            />
          )}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-orange-primary transition-colors cursor-pointer">
            <input
              onChange={onHandleChange}
              type="file"
              name="coverImage"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-primary file:text-white hover:file:bg-orange-dark cursor-pointer"
              accept="image/*"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-primary hover:bg-orange-dark text-white font-semibold py-3 rounded-xl shadow-button hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 mt-2 cursor-pointer"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
}