import ProductSlider from './ProductSlider'
import useFetchApi from '../hooks/useFetchApi'
import { IProduct } from '../types/products'

const BestSellingProducts = () => {
  const { data, loading, error } = useFetchApi<IProduct[]>(
    '/products?offset=0&limit=10'
  )

  return (
    <>
      <ProductSlider
        title='Best selling'
        products={data ? data : []}
        loading={loading}
        error={error}
      />
    </>
  )
}

export default BestSellingProducts
