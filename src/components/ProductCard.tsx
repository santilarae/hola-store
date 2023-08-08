import { Link } from 'react-router-dom'
import { CartIcon, CloseIcon } from './Icons'
import { IProduct, IProductCart } from '../types/products'
import { ChangeEvent, MouseEventHandler, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  addToCart,
  removeFromCart,
  updateProductQty
} from '../store/slices/cart'
import { UIComponents, openComponent } from '../store/slices/ui'

interface ProductCardProps {
  product: IProductCart | IProduct
  inCart?: boolean
}

const ProductCard = ({ product, inCart }: ProductCardProps) => {
  return inCart ? (
    <ProductCardInCart product={product as IProductCart} />
  ) : (
    <ProductCardCommon product={product} />
  )
}

const ProductCardCommon = ({ product }: { product: IProduct }) => {
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
  const imgRef = useRef<HTMLImageElement>(null)
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

const ProductCardInCart = ({ product }: { product: IProductCart }) => {
  const dispatch = useAppDispatch()
  const qtyArr = Array(10).fill('')

  const handleQty = (e: ChangeEvent<HTMLSelectElement>, id: number) => {
    dispatch(
      updateProductQty({
        id,
        qty: Number(e.target.value)
      })
    )
  }

  const handleRemoveProduct = (id: number) => {
    dispatch(removeFromCart(id))
  }
  return (
    <div
      key={`product-cart${product.id}`}
      className='border-b border-neutral grid grid-cols-3 p-4 gap-2 items-center'
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className='aspect-square shrink-0 w-full rounded'
        width={640}
        height={640}
      />
      <div className='col-span-2'>
        <p className='flex font-bold items-start justify-between'>
          <span className='pt-1'>{product.title}</span>
          <button
            className='shrink-0 p-2'
            onClick={() => handleRemoveProduct(product.id)}
          >
            <CloseIcon className='w-4 h-4 grayscale contrast-0 opacity-50 hover:opacity-100 transition-opacity' />
          </button>
        </p>
        <p className='truncate text-sm'>{product.description}</p>
        <p>
          Quantity:
          <select name='quantity' onChange={e => handleQty(e, product.id)} value={product.quantity}>
            {qtyArr.map((_, i) => (
              <option key={`cart-qty=${i + 1}`} value={i + 1}>
                {i + 1} {i + 1 >= 10 ? 'units' : 'unit'}
              </option>
            ))}
          </select>
        </p>
        <p>
          {product.quantity} x ${product.quantity * product.price}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
