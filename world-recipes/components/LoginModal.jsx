'use client';

import { useState } from 'react';
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';

export default function LoginModal({ onClose, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({ email: "", password: "" });

    const endpoint = isSignUp ? '/api/user/register' : '/api/user/signin';

    try {
      const response = await axios.post(endpoint, form);
      console.log("Login response:", response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setSuccess(response.data.message);
      setError("");
      
      if (onLogin) onLogin();
      setTimeout(() => onClose(), 500);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="bg-orange-primary px-6 py-5">
          <h1 className="text-xl font-bold text-white text-center">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-orange-100 text-sm text-center mt-1">
            {isSignUp ? 'Join our cooking community' : 'Log in to continue'}
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-5"
        >
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="email" 
                name='email'
                className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:border-orange-primary"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="password" 
                className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:border-orange-primary"
                name='password'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {success && (
            <p className="text-green-600 text-sm text-center bg-green-50 py-2 rounded-lg">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button 
            type="submit"
            className="bg-orange-primary hover:bg-orange-light text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>

          <p
            className="text-center text-gray-600 text-sm cursor-pointer hover:text-orange-primary"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccess('');
            }}
          >
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <span className="font-semibold">
              {isSignUp ? 'Log In' : 'Sign Up'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}