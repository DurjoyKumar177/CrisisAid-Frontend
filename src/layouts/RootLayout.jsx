import { Outlet } from 'react-router-dom' 
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'

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