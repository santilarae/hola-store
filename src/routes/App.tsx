import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MainLayout from '../layout/MainLayout'
import ProductsPage from '../pages/ProductsPage'
import { useEffect } from 'react'
import ProductPage from '../pages/ProductPage'

const App = (): JSX.Element => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:productId' element={<ProductPage />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </MainLayout>
  )
}

export default App
