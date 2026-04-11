'use client';

import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';

export default function LoginModal({ onClose, onLogin }) {
  const [form, setForm] = useState({ name: '', email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const endpoint = isSignUp ? '/api/user/register' : '/api/user/signin';

    try {
      const response = await axios.post(endpoint, form);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setSuccess(response.data.message || (isSignUp ? 'Account created!' : 'Welcome back!'));
      
      if (onLogin) onLogin();
      setTimeout(() => onClose(), 800);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-3xl shadow-modal overflow-hidden animate-fade-in-up"
      >
        <div className="relative bg-gradient-to-r from-orange-primary to-orange-hover px-8 py-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <IoCloseOutline className="w-5 h-5" />
          </button>
          
          <h1 className="text-2xl font-bold text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-orange-100 text-sm mt-2">
            {isSignUp ? 'Join our cooking community' : 'Log in to continue'}
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="p-8 flex flex-col gap-5"
        >
          {isSignUp && (
            <div className="group">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  name='name'
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 
                    transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-primary/20 
                    focus:border-orange-primary hover:border-orange-primary/50"
                  placeholder="Your name"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="email" 
                name='email'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 
                  transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-primary/20 
                  focus:border-orange-primary hover:border-orange-primary/50"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="password" 
                className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 
                  transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-primary/20 
                  focus:border-orange-primary hover:border-orange-primary/50"
                name='password'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {success && (
            <div className="flex items-center gap-2 text-green-600 text-sm text-center bg-green-50 py-3 rounded-2xl px-4">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {success}
            </div>
          )}
          
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm text-center bg-red-50 py-3 rounded-2xl px-4">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="bg-orange-primary hover:bg-orange-dark text-white font-semibold py-4 rounded-2xl 
              shadow-button hover:shadow-lg hover:shadow-orange-primary/40 transition-all duration-300 
              hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 
              flex items-center justify-center gap-3 mt-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Please wait...
              </>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>

          <p
            className="text-center text-gray-600 text-sm cursor-pointer hover:text-orange-primary transition-colors py-2"
            onClick={toggleMode}
          >
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <span className="font-semibold">Sign In</span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span className="font-semibold">Sign Up</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}