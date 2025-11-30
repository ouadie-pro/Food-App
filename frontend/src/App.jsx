import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import InputFrom from './Components/InputFrom'
export default function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/InputFrom' element={<InputFrom></InputFrom>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}
