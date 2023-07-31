import { CartIcon, CloseIcon } from './Icons'

const ShoppingCart = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-dark/75'>
      <aside className='w-full h-full bg-light grid grid-rows-[min-content_1fr_min-content] ml-auto shadow-lg sm:max-w-sm'>
        <header className='p-2 flex justify-between items-center border-b border-neutral'>
          <CartIcon className='h-6 m-3' />
          <span className='text-3xl'>Cart</span>
          <button className='p-3'>
            <CloseIcon className='h-6' />
          </button>
        </header>
        <div className='p-4 overflow-y-auto'></div>
        <footer>
          <p className='text-xl text-center border-y border-neutral py-4'>
            Subtotal: $540.000
          </p>
          <div className='flex gap-2 p-4'>
            <a
              href=''
              className='w-full text-center p-2 rounded font-bold text-primary border border-primary pt-3'
            >
              VIEW CART
            </a>
            <a
              href=''
              className='w-full text-center p-2 rounded font-bold text-light bg-primary border border-primary pt-3'
            >
              CHECKOUT
            </a>
          </div>
        </footer>
      </aside>
    </div>
  )
}

export default ShoppingCart
