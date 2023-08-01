import React from 'react'
import Navbar from '../components/Navbar'
import ShoppingCart from '../components/ShoppingCart'
import Footer from '../components/Footer'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main> {children}</main>
      <Footer />
      <ShoppingCart />
    </>
  )
}

export default MainLayout
