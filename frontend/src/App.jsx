import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
export default function App() {
  return (
    <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
        </Routes>
    </BrowserRouter>
  )
}
