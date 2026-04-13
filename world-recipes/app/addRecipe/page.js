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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{borderColor: '#ea580c'}}></div>
      </div>
    );
  }

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
    <div style={{backgroundColor: '#fff7ed'}} className="flex justify-center items-center min-h-[80vh] py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg shadow-md rounded-2xl p-8 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4" style={{color: '#ea580c'}}>
          Add New Recipe
        </h2>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Title</label>
          <input
            onChange={onHandleChange}
            type="text"
            name="title"
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
            placeholder="Recipe title"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Ingredients</label>
          <textarea
            onChange={onHandleChange}
            name="ingredients"
            className="border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none outline-none"
            placeholder="Separate ingredients with commas"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Instructions</label>
          <textarea
            onChange={onHandleChange}
            name="instructions"
            className="border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none outline-none"
            placeholder="Write preparation steps..."
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 font-medium mb-2">Cover Image</label>
          <input
            onChange={onHandleChange}
            type="file"
            name="coverImage"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{backgroundColor: submitting ? '#9ca3af' : '#ea580c'}}
          className="w-full text-white font-semibold py-3 rounded-lg mt-4"
        >
          {submitting ? "Saving..." : "Save Recipe"}
        </button>
      </form>
    </div>
  );
}
