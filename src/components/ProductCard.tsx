import { Link } from 'react-router-dom'
import { CartIcon } from './Icons'
import { IProduct } from '../types/products'

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <article className='flex flex-col max-w-sm border border-neutral rounded h-full'>
        <img src={product.images[0]} alt={product.title} className='aspect-square' width={640} height={640}/>
        <div className='p-4 h-full flex flex-col justify-between'>
          <p className='flex flex-col'>
            <span>{product.title}</span>
            <span>{product.category.name}</span>
          </p>
          <div className='flex items-center justify-between'>
            <p className='pt-2'> ${product.price}</p>
            <button aria-label="Add product to cart" className='grayscale brightness-50 opacity-30 border border-primary p-1.5 rounded-full hover:opacity-100 hover:brightness-100 hover:grayscale-0 transition'>
              <CartIcon className='w-5 h-5' />
              
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard
