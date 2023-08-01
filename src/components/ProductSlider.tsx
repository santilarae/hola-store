import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { useCallback, useRef } from 'react'
import { IProduct } from '../types/products'
import ProductCard from './ProductCard'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import { ArrowIcon } from './Icons'

export interface ProductSlider {
  title: string
  products: IProduct[]
  loading: boolean
  error: null | string
}

const ProductSlider = ({ title, products, loading, error }: ProductSlider) => {
  const sliderRef = useRef<SwiperRef>(null)

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])


  return (
    <>
      <section className='max-w-7xl mx-auto my-16 lg:my-20'>
        <header className='px-4 flex justify-between gap-4 mb-6 items-center'>
          <h2 className='text-2xl uppercase font-bold border-b-4 border-secondary pl-2 pr-4 truncate lg:text-3xl'>
            {title}
          </h2>
          <div className='space-x-2'>
            <button
              className='bg-secondary rounded-full p-1.5 rotate-90'
              onClick={handlePrev}
            >
              <ArrowIcon className='w-4 h-4' />
            </button>
            <button
              className='bg-secondary rounded-full p-1.5 -rotate-90'
              onClick={handleNext}
            >
              <ArrowIcon className='w-4 h-4' />
            </button>
          </div>
        </header>
        {(products.length > 0 && !loading) && (
          <Swiper
            ref={sliderRef}
            spaceBetween={2}
            slidesPerView={2}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 3
              },
              768: {
                slidesPerView: 4
              },
              1024: {
                slidesPerView: 5
              }
            }}
            pagination={{
              clickable: true,
              renderBullet: function (_, className) {
                return '<span class="' + className + ' bg-secondary"></span>'
              }
            }}
            modules={[Pagination]}
          >
            {products.map(product => (
              <SwiperSlide key={`${product.title}-${product.id}`} className='mb-10 h-auto'>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {(products === null && !loading && error) && (
          <div className='flex items-center justify-center text-xl p-8'>
            No products found
          </div>
        )}
        
        {loading && (
          <div className='flex items-center justify-center text-xl p-8'>
            Loading ...
          </div>
        )}
      </section>
    </>
  )
}

export default ProductSlider
