import BestSellingProducts from '../components/BestSellingProducts'
import CategoriesSection from '../components/CategoriesSection'
import Hero from '../components/Hero'
import MostPopularProducts from '../components/MostPopularProducts'

const HomePage = () => {
  return (
    <>
      <Hero />
      <BestSellingProducts />
      <CategoriesSection />
      <MostPopularProducts />
    </>
  )
}

export default HomePage
