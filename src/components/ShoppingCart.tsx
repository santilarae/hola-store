import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { UIComponents, closeComponent } from '../store/slices/ui'
import { CartIcon } from './Icons'
import SideNav from './SideNav'

const ShoppingCart = () => {
  const { showShoppingCart } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(closeComponent(UIComponents.ShoppingCart))
  return (
    <SideNav show={showShoppingCart} onClose={handleClose}>
      <SideNav.Header title='Cart' icon={<CartIcon className='' />} />
      <SideNav.Content>holanda</SideNav.Content>
      <SideNav.Footer>
        <p className='text-xl text-center border-y border-neutral py-4'>
          Subtotal: $540.000
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
    </SideNav>
  )
}

export default ShoppingCart
