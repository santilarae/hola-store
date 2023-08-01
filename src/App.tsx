import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ShoppingCart from './components/ShoppingCart'

const App = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Hero/>
      <ShoppingCart />
    </>
  )
}

export default App
