import React from 'react'
import Navbar from '../components/Navbar'
import ShoppingCart from '../components/ShoppingCart'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main> {children}</main>
      <ShoppingCart />
    </>
  )
}

export default MainLayout
