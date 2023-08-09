import Navbar from '../components/Navbar'
import ShoppingCart from '../components/ShoppingCart'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ShoppingCart />
    </>
  )
}

export default MainLayout
