import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MainLayout from '../layout/MainLayout'
import ProductsPage from '../pages/ProductsPage'
import { useEffect } from 'react'
import ProductPage from '../pages/ProductPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import { useAppDispatch } from '../hooks/redux'
import { closeAllComponent } from '../store/slices/ui'

const App = (): JSX.Element => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(closeAllComponent())
  }, [location.pathname])
  return (
    <Routes>
      <Route path='' element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:productId' element={<ProductPage />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignupPage />} />
    </Routes>
  )
}

export default App
