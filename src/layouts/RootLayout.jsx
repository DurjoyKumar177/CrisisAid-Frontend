import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom' 
import Footer from '../Components/Footer'

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div >
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout