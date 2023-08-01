import { Link } from 'react-router-dom'
import { CartIcon } from './Icons'
import { IProduct } from '../types/products'

const ProductCard = (props: IProduct) => {
  return (
    <Link to={`/product/${props.id}`}>
      <article className='max-w-sm border border-neutral rounded'>
        <img src='https://picsum.photos/640/640?r=7204' alt='' />
        <div className='p-4 space-y-1'>
          <p className='flex flex-col'>
            <span>{props.title}</span>
            <span>{props.category.name}</span>
          </p>
          <div className='flex items-center justify-between'>
            <p className='pt-2'> ${props.price}</p>
            <button className='grayscale brightness-50 opacity-30 border border-primary p-1.5 rounded-full hover:opacity-100 hover:brightness-100 hover:grayscale-0 transition'>
              <CartIcon className='w-5 h-5' />
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard
