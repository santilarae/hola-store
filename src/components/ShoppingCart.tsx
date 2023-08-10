import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { UIComponents, closeComponent } from '../store/slices/ui'
import { CartIcon } from './Icons'
import SideNav from './SideNav'
import ProductCard from './ProductCard'
import { MouseEventHandler } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrder } from '../store/slices/orders'
import { cleanCart } from '../store/slices/cart'

const ShoppingCart = () => {
  const { showShoppingCart } = useAppSelector(state => state.ui)
  const { products } = useAppSelector(state => state.cart)
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const handleClose = () => dispatch(closeComponent(UIComponents.ShoppingCart))

  const subtotal = products.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity
  }, 0)

  const areThereProducts = products.length > 0

  const handleCreateOrder: MouseEventHandler<HTMLButtonElement> = () => {
    if (!user.username) {
      navigate('/login', {
        state: { prevLocation: location.pathname, fromCart: true }
      })
      return
    }
    const newOrder = {
      id: Date.now(),
      products,
      total: subtotal,
      date: new Date(),
      status: 'success',
      username: user.username
    }
    dispatch(addOrder(newOrder))
    dispatch(cleanCart())
    navigate('/orders/' + newOrder.id)
  }

  return (
    <SideNav show={showShoppingCart} onClose={handleClose}>
      <SideNav.Header
        title='Cart'
        icon={
          <CartIcon className='text-primary' accentColor='text-secondary' />
        }
      />
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
            <button
              onClick={handleCreateOrder}
              className='w-full text-center p-2 rounded font-bold text-light bg-primary border border-primary pt-3'
            >
              CREATE ORDER
            </button>
          </div>
        </SideNav.Footer>
      )}
    </SideNav>
  )
}

export default ShoppingCart
