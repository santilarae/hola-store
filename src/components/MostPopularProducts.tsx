import ProductSlider from './ProductSlider'
import useFetchApi from '../hooks/useFetchApi'
import { IProduct } from '../types/products'

const MostPopularProducts = () => {
  const { data, loading, error } = useFetchApi<IProduct[]>(
    '/products?offset=10&limit=10'
  )

  return (
    <>
      <ProductSlider
        title='Most popular'
        products={data ? data : []}
        loading={loading}
        error={error}
      />
    </>
  )
}

export default MostPopularProducts
