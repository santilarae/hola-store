import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { UIComponents, closeComponent } from '../store/slices/ui'
import { CartIcon } from './Icons'
import SideNav from './SideNav'
import ProductCard from './ProductCard'

const ShoppingCart = () => {
  const { showShoppingCart } = useAppSelector(state => state.ui)
  const { products } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(closeComponent(UIComponents.ShoppingCart))

  const subtotal = products.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity
  }, 0)

  const areThereProducts = products.length > 0

  return (
    <SideNav show={showShoppingCart} onClose={handleClose}>
      <SideNav.Header title='Cart' icon={<CartIcon className='' />} />
      <SideNav.Content>
        {products.map(product => (
          <ProductCard
            key={`ProductInCart-${product.id}`}
            product={product}
            inCart
          />
        ))}
        {!areThereProducts && (
          <p className='text-center py-8 text-xl'>No products</p>
        )}
      </SideNav.Content>
      {areThereProducts && (
        <SideNav.Footer>
          <p className='text-xl text-center border-y border-neutral py-4'>
            Subtotal: ${subtotal}
          </p>
          <div className='flex gap-2 p-4'>
            <button className='w-full text-center p-2 rounded font-bold text-primary border border-primary pt-3'>
              VIEW CART
            </button>
            <button className='w-full text-center p-2 rounded font-bold text-light bg-primary border border-primary pt-3'>
              CHECKOUT
            </button>
          </div>
        </SideNav.Footer>
      )}
    </SideNav>
  )
}

export default ShoppingCart
