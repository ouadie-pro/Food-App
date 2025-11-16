import React from 'react'
import Logo from '../assets/logo.png'
export default function Navbar() {
  return (
    <header>
        <nav className="navbar">
            <div className='logo'>
                <img src={Logo} alt="" />
            </div> 
            <ul className="nav-links">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/recipes">Recipes</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
    </header>
  )
}
