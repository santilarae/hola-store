import { Link } from 'react-router-dom'
import { CartIcon } from './Icons'
import { IProduct } from '../types/products'
import { MouseEventHandler, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { addToCart } from '../store/slices/cart'
import { UIComponents, openComponent } from '../store/slices/ui'

const ProductCard = ({ product }: { product: IProduct }) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const { products } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()
  
  const isInCart =
    products.findIndex(p => p.id === product.id) >= 0 ? true : false

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    if (isInCart) {
      dispatch(openComponent(UIComponents.ShoppingCart))
    } else {
      dispatch(addToCart(product))
    }
  }

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src as string
            observer.unobserve(img)
          }
        })
      }
    )

    if (imgRef.current) {
      intersectionObserver.observe(imgRef.current)
    }

    return () => {
      intersectionObserver.disconnect()
    }
  }, [])
  return (
    <Link to={`/product/${product.id}`}>
      <article className='flex flex-col max-w-sm border border-neutral rounded h-full'>
        <img
          data-src={product.images[0]}
          alt={product.title}
          ref={imgRef}
          className='aspect-square shrink-0'
          width={640}
          height={640}
        />
        <div className='h-full p-4 flex flex-col justify-between'>
          <p className='flex flex-col'>
            <span>{product.title}</span>
            <span>{product.category.name}</span>
          </p>
          <div className='flex items-center justify-between'>
            <p className='pt-2'> ${product.price}</p>
            <button
              onClick={handleAddToCart}
              aria-label='Add product to cart'
              className={`
              ${isInCart ? '' : 'grayscale brightness-50 opacity-30'}
               border border-primary p-1.5 rounded-full hover:opacity-100 hover:brightness-100 hover:grayscale-0 transition`}
            >
              <CartIcon className='w-5 h-5' />
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard
