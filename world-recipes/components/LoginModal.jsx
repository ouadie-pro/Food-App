'use client';

import { useState } from 'react';
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
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
    <div onClick={onClose} className='fixed inset-0 bg-black/50 bg-opacity-30 flex justify-center items-center z-50'>
      <form 
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className='md:w-[380px] md:h-[400px] sm:w-[300px] sm:h-[350px] w-[270px] h-[260px] shadow-2xl rounded-[20px] 
        flex flex-col items-center md:gap-7 sm:gap-5 mx-auto bg-white'
      >
        <div className="bg-[#ff9560] w-full h-[60px] rounded-t-[20px] flex justify-center items-center">
          <h1 className="text-xl text-white">Create Account</h1>
        </div>

        <div className='flex border-2 border-[#ff9560] gap-2 rounded-full items-center p-1'>
          <div className='w-10 h-10 bg-[#ff9560] rounded-full text-white flex justify-center items-center'>
            <MdAlternateEmail />
          </div>
          <input 
            type="email" 
            name='email'
            className='focus:outline-none p-2'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className='flex border-2 border-[#ff9560] gap-2 rounded-full items-center p-1'>
          <div className='w-10 h-10 bg-[#ff9560] rounded-full text-white flex justify-center items-center'>
            <RiLockPasswordLine />
          </div>
          <input 
            type="password" 
            className='focus:outline-none p-2'
            name='password'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button 
          type="submit"
          className="text-xl mt-4 border-2 border-orange-400 px-4 py-1 rounded-full bg-[#ff9560] text-white shadow-lg"
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        {success && <h5 className="text-green-500">{success}</h5>}
        {error && <h5 className="text-red-500">{error}</h5>}

        <p
          className='font-bold cursor-pointer'
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an account?" : "Create an account?"}
        </p>
      </form>
    </div>
  );
}
