import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Sort, fetchProducts, resetFilter } from '../store/slices/products'
import ProductCard from '../components/ProductCard'
import { CloseIcon, FiltersIcon } from '../components/Icons'
import { UIComponents, openComponent } from '../store/slices/ui'
import Filters from '../components/Filters'
import { IProduct } from '../types/products'

const ProductsPage = () => {
  const { products, loading, error, filters } = useAppSelector(
    state => state.products
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  let filteredProducts: IProduct[] = []

  switch (filters.sort) {
    case Sort.DEFAULT:
      filteredProducts = products
      break
    case Sort.NEWEST:
      filteredProducts = [...products].sort((a, b) => b.id - a.id)
      break
    case Sort.PRICE_ASC:
      filteredProducts = [...products].sort((a, b) => a.price - b.price)
      break
    case Sort.PRICE_DESC:
      filteredProducts = [...products].sort((a, b) => b.price - a.price)
      break
    default:
      break
  }

  if (filters.title) {
    filteredProducts = filteredProducts.filter(p =>
      p.title.toLowerCase().includes((filters.title || '').toLowerCase())
    )
  }

  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.id === filters.category?.id
    )
  }

  if (filters.price_min) {
    filteredProducts = filteredProducts.filter(
      p => p.price >= (filters.price_min as number)
    )
  }

  if (filters.price_max) {
    filteredProducts = filteredProducts.filter(
      p => p.price <= (filters.price_max as number)
    )
  }

  return (
    <>
      <Filters />
      <section className='max-w-7xl mx-auto my-6 md:px-4 md:my-8'>
        <header className='flex px-4 justify-between items-center mb-2 md:px-0 md:mb-4'>
          <div className='flex items-end gap-x-2'>
            <h1 className='text-3xl md:text-4xl font-bold uppercase'>
              Products
            </h1>
            <span className='hidden '>{filteredProducts.length} results</span>
            <span className='text-dark/50'>[{filteredProducts.length}]</span>
          </div>
          <button
            className='uppercase p-2.5 border border-dark rounded font-bold flex gap-2'
            onClick={() => dispatch(openComponent(UIComponents.Filters))}
          >
            <span className='hidden md:inline-block'>sort & filter</span>
            <FiltersIcon className='w-6 h-6' />
          </button>
        </header>
        <div className='px-4 mb-4  flex flex-wrap items-center gap-1 text-sm'>
          {Object.entries(filters).map(([key, value]) => {
            if (key === 'sort')
              return (
                <span key={key} className='border p-2'>
                  {filters.sort}
                </span>
              )

            if (key === 'category') {
              value = value.name
            }
            if (key === 'price_min') {
              value = `MIN: $${value}`
            }
            if (key === 'price_max') {
              value = `MAX: $${value}`
            }
            if (!value) {
              return null
            }
            return (
              <div key={key} className='border flex items-center'>
                <span className='p-2'>{value}</span>
                <button
                  className='p-2'
                  onClick={() =>
                    dispatch(resetFilter(key as keyof typeof filters))
                  }
                >
                  <CloseIcon className='w-3.5 h-3.5' />
                </button>
              </div>
            )
          })}
        </div>
        {loading && (
          <div className='h-[50vh] flex flex-col justify-center items-center border'>
            <span className='block w-10 h-10 rounded-full border-4 border-b-secondary animate-spin mb-2'></span>
            Loading...
          </div>
        )}
        {!error && !loading && (
          <div className='grid grid-cols-2 gap-0.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {filteredProducts.length === 0 && !loading && (
          <div className='h-[50vh] flex flex-col justify-center items-center border'>
            <p>No products found</p>
            {error?.message}
          </div>
        )}
      </section>
    </>
  )
}

export default ProductsPage
