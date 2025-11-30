import React, { useState } from 'react'
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function InputFrom() {
  const [MyForm,SetForm] = useState({email:"",password:""});

  const Menu = [
    {
      id:1,
      Icon:<MdAlternateEmail />,
      Inp:<input 
            type='email'
            className='focus:outline-none p-2'
            value={MyForm.email}
            onChange={(e)=> SetForm({...MyForm,email:e.target.value})}
          />
    },
    {
      id:2,
      Icon:<RiLockPasswordLine />,
      Inp:<input 
            type='password'
            className='focus:outline-none p-2'
            value={MyForm.password}
            onChange={(e)=> SetForm({...MyForm,password:e.target.value})}
          />
    },
  ]

  return (
    <div className='flex justify-center items-center'>
      <form 
        className='md:w-[380px] md:h-[400px] sm:w-[300px] sm:h-[350px] 
        w-[270px] h-[260px] shadow-2xl rounded-[20px] 
        flex flex-col items-center md:gap-7 sm:gap-5 mx-auto bg-white'
      >
        <div className="bg-orange-500 w-full h-[60px] rounded-t-[20px] flex justify-center items-center">
          <h1 className="text-xl text-white">Create Account</h1>
        </div>

        <div className='space-y-4 mt-4'>
          {Menu.map((data)=>(
            <div className='flex border-2 border-orange-600 gap-2 rounded-full items-center p-1'>
              <div className='w-10 h-10 bg-orange-600 rounded-full text-white flex justify-center items-center'>
                {data.Icon}
              </div>
              {data.Inp}
            </div>
          ))}
        </div>

        <button 
          type="submit"
          className="text-xl mt-4 border-2 border-orange-400 px-4 py-1 rounded-full bg-orange-500 text-white shadow-lg"
        >
          Sign In
        </button>

        <p className="mt-2">Don't have an account?</p>

      </form>
    </div>
  )
}
