'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddRecipes() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

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
    setSubmitting(true);
    
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token);
    console.log("Token type:", typeof token);
    console.log("Token is null?:", token === null);
    
    if (!token || token === 'null' || token === 'undefined') {
      alert("Please log in first");
      router.push('/');
      setSubmitting(false);
      return;
    }
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("instructions", formData.instructions);
      formDataToSend.append("ingredients", JSON.stringify(formData.ingredients));
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }
      
      await axios.post('/api/recipe/add', formDataToSend, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      router.push("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      setSubmitting(false);
      if (error.response?.status === 401 || error.response?.status === 400) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert("Session expired. Please log in again");
        router.push('/');
      } else {
        alert("Error uploading recipe");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg shadow-md rounded-2xl p-8 flex flex-col gap-5"
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Add New Recipe
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Share your culinary creation with the world
          </p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Title</label>
          <input
            onChange={onHandleChange}
            type="text"
            name="title"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-primary"
            placeholder="Recipe title"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Ingredients</label>
          <textarea
            onChange={onHandleChange}
            name="ingredients"
            className="border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:border-orange-primary"
            placeholder="Separate ingredients with commas"
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Instructions</label>
          <textarea
            onChange={onHandleChange}
            name="instructions"
            className="border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:border-orange-primary"
            placeholder="Write preparation steps..."
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Cover Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-primary transition-colors cursor-pointer">
            <input
              onChange={onHandleChange}
              type="file"
              name="coverImage"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-primary file:text-white hover:file:bg-orange-light"
              accept="image/*"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-orange-primary hover:bg-orange-light disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
        >
          {submitting ? "Saving..." : "Save Recipe"}
        </button>
      </form>
    </div>
  );
}