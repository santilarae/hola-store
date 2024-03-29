import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { addToCart } from '../store/slices/cart'
import { Sort, setFilters } from '../store/slices/products'
import { CartIcon, DeliveryIcon } from '../components/Icons'
import useFetchApi from '../hooks/useFetchApi'
import { IProduct } from '../types/products'
import { UIComponents, openComponent } from '../store/slices/ui'

const ProductPage = () => {
  const { productId } = useParams()
  const {
    data: product,
    error,
    loading
  } = useFetchApi<IProduct>('/products/' + productId)
  const { products: cartProducts } = useAppSelector(state => state.cart)
  const productInCart = cartProducts.find(p => p.id === Number(productId))

  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product))
      dispatch(openComponent(UIComponents.ShoppingCart))
    }
  }

  const handleGoToCategory = () => {
    if (product?.category) {
      dispatch(
        setFilters({
          sort: Sort.DEFAULT,
          category: { ...product?.category, productQuantity: NaN }
        })
      )
    }
  }

  if (loading) {
    return (
      <div className='h-[50vh] flex flex-col justify-center items-center border'>
        <span className='block w-10 h-10 rounded-full border-4 border-b-secondary animate-spin mb-2'></span>
        Loading...
      </div>
    )
  }

  if (error && !loading) {
    return (
      <div className='h-[50vh] flex flex-col justify-center items-center border'>
        <p>No products found</p>
        {error?.message}
      </div>
    )
  }

  return (
    <>
      <Swiper
        className='sm:hidden'
        slidesPerView={1}
        pagination={{
          clickable: true,
          renderBullet: function (_, className) {
            return '<span class="' + className + ' bg-primary"></span>'
          }
        }}
        modules={[Pagination]}
      >
        {product?.images.map(image => (
          <SwiperSlide key={`imageProduct-${image}`} className='bg-primary'>
            <img src={image} className='w-full' />
          </SwiperSlide>
        ))}
      </Swiper>
      <section className='sm:grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_450px] lg:grid-cols-[1fr_490px]'>
        <div className='hidden sm:grid sm:grid-cols-2 border-r border-neutral auto-rows-min bg-neutral/50'>
          {product?.images.map(image => (
            <img
              key={image}
              src={image}
              className='w-full col-span-full xl:col-span-1'
            />
          ))}
        </div>
        <div className='px-4 py-8 sm:p-8 w-full'>
          <div className='sm:sticky sm:top-28'>
            <Link
              to='/products'
              className='inline-block border py-1 px-2 mb-4'
              onClick={handleGoToCategory}
            >
              {product?.category.name}
            </Link>
            <h1 className='text-4xl font-semibold'>{product?.title}</h1>
            <p className='text-2xl font-semibold mb-4'>${product?.price}</p>
            <p className='mb-4'>{product?.description}</p>
            <button
              onClick={handleAddToCart}
              className='flex gap-3 items-center text-center p-2 rounded font-bold text-light bg-primary border border-primary pt-3 px-4 disabled:cursor-not-allowed disabled:opacity-70'
              disabled={productInCart ? productInCart.quantity >= 10 : false}
            >
              ADD TO BAG
              <CartIcon
                className='w-5 text-light'
                accentColor='text-secondary'
              />
            </button>
            {productInCart && (
              <span className='inline-block p-3 mt-4 text-sm bg-neutral/20 rounded border border-neutral text-dark/90'>
                You already added {productInCart.quantity}
              </span>
            )}
            <p className='flex items-center mt-6'>
              <DeliveryIcon className='w-8 mr-4' />
              Free delivery on selected cities
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductPage
