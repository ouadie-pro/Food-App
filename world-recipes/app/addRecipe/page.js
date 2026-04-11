'use client';

import { useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoCloudUploadOutline, IoRestaurantOutline, IoCheckmarkCircle } from 'react-icons/io5';

export default function AddRecipes() {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    coverImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const router = useRouter();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      setFormData((prev) => ({ ...prev, coverImage: file }));
      setImagePreview(URL.createObjectURL(file));
      if (errors.coverImage) {
        setErrors((prev) => ({ ...prev, coverImage: '' }));
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("instructions", formData.instructions);
      formDataToSend.append("ingredients", JSON.stringify(formData.ingredients.split(',').map(i => i.trim()).filter(Boolean)));
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      await axios.post('/api/recipe/add', formDataToSend, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      router.push("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error uploading recipe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-cream-100 via-white to-orange-muted py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-primary rounded-2xl shadow-button mb-4">
            <IoRestaurantOutline className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Add New Recipe
          </h2>
          <p className="text-gray-600 mt-2">
            Share your culinary creation with the world
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-card-hover p-8 lg:p-10 flex flex-col gap-6 animate-fade-in-up"
        >
          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Recipe Title</label>
            <input
              onChange={onHandleChange}
              type="text"
              name="title"
              value={formData.title}
              className={`w-full border-2 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 transition-all duration-300 
                focus:outline-none focus:ring-4 focus:ring-orange-primary/20 
                ${errors.title ? 'border-red-400' : 'border-gray-200 hover:border-orange-primary/50'}`}
              placeholder="e.g., Homemade Pasta Carbonara"
              required
            />
            {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Ingredients</label>
            <textarea
              onChange={onHandleChange}
              name="ingredients"
              value={formData.ingredients}
              className={`w-full border-2 rounded-2xl px-5 py-4 h-32 resize-none text-gray-900 placeholder-gray-400 transition-all duration-300 
                focus:outline-none focus:ring-4 focus:ring-orange-primary/20 
                ${errors.ingredients ? 'border-red-400' : 'border-gray-200 hover:border-orange-primary/50'}`}
              placeholder="Separate ingredients with commas: flour, eggs, milk, butter..."
              required
            />
            {errors.ingredients && <p className="text-red-500 text-sm mt-2">{errors.ingredients}</p>}
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Instructions</label>
            <textarea
              onChange={onHandleChange}
              name="instructions"
              value={formData.instructions}
              className={`w-full border-2 rounded-2xl px-5 py-4 h-40 resize-none text-gray-900 placeholder-gray-400 transition-all duration-300 
                focus:outline-none focus:ring-4 focus:ring-orange-primary/20 
                ${errors.instructions ? 'border-red-400' : 'border-gray-200 hover:border-orange-primary/50'}`}
              placeholder="Step 1: Mix the dry ingredients... Step 2: Add wet ingredients..."
              required
            />
            {errors.instructions && <p className="text-red-500 text-sm mt-2">{errors.instructions}</p>}
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Cover Image</label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 
                ${isDragging 
                  ? 'border-orange-primary bg-orange-muted' 
                  : errors.coverImage 
                    ? 'border-red-400' 
                    : 'border-gray-200 hover:border-orange-primary hover:bg-orange-muted/30'
                }`}
            >
              <input
                ref={fileInputRef}
                onChange={(e) => handleImageChange(e.target.files[0])}
                type="file"
                name="coverImage"
                className="hidden"
                accept="image/*"
              />
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-48 object-contain rounded-xl mx-auto"
                  />
                  <p className="text-gray-500 text-sm mt-3 flex items-center justify-center gap-2">
                    <IoCheckmarkCircle className="w-4 h-4 text-green-500" />
                    Click or drag to change
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <IoCloudUploadOutline className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-600 font-medium">
                    Drag and drop your image here
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    or click to browse
                  </p>
                  <p className="text-gray-400 text-xs mt-3">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-primary hover:bg-orange-dark text-white font-semibold py-4 rounded-2xl 
              shadow-button hover:shadow-lg hover:shadow-orange-primary/40 transition-all duration-300 
              hover:-translate-y-1 mt-2 disabled:opacity-70 disabled:cursor-not-allowed 
              disabled:hover:translate-y-0 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving Recipe...
              </>
            ) : (
              'Save Recipe'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}