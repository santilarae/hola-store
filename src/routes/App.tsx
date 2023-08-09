import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MainLayout from '../layout/MainLayout'
import ProductsPage from '../pages/ProductsPage'
import { useEffect } from 'react'
import ProductPage from '../pages/ProductPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { UIComponents, closeAllComponent } from '../store/slices/ui'

const App = (): JSX.Element => {
  const location = useLocation()
  const ui = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(closeAllComponent())
  }, [location.pathname])

  useEffect(() => {
    const overflowHidden = Object.entries(ui).some(
      ([key, value]) => value && key !== UIComponents.UserDropdown
    )

    if (overflowHidden) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [ui])

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
