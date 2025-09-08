import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom' // Import Outlet from react-router-dom
import Footer from '../Components/Footer'

//what is outlet?
// The Outlet component is a placeholder that renders the matched child route's element.

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