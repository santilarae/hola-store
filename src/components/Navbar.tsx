import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  UIComponents,
  closeAllComponent,
  closeComponent,
  openComponent
} from '../store/slices/ui'
import {
  CartIcon,
  CloseIcon,
  HolaStoreLogo,
  MenuIcon,
  SearchIcon,
  UserIcon
} from './Icons'
import { logoutUser } from '../store/slices/user'
import { FormEventHandler, useEffect, useState } from 'react'
import { setFilters } from '../store/slices/products'

const navigation = [
  { to: '/', title: 'Home' },
  { to: '/products', title: 'Products' },
  { to: '/about-us', title: 'About us' },
]

const Navbar = () => {
  const { showMenu, showSearchbar, showUserDropdown } = useAppSelector(
    state => state.ui
  )
  const user = useAppSelector(state => state.user)
  const { products } = useAppSelector(state => state.cart)
  const { filters } = useAppSelector(state => state.products)
  const [query, setQuery] = useState<string>('')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(filters.title || '')
  }, [filters.title])

  const cartQuantity: number = products.reduce(
    (prev, curr) => prev + curr.quantity,
    0
  )
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  const handleSearch: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('title')?.toString()
    dispatch(closeAllComponent())
    dispatch(setFilters({ ...filters, title: query }))
    navigate('/products')
  }

  return (
    <header className='sticky top-0 left-0 py-2 px-4 border-b border-neutral/50 md:py-3 bg-light z-40'>
      <div className='flex items-center max-w-7xl m-auto'>
        <button
          className='text-xl p-3 w-12 h-12 relative md:hidden'
          onClick={() => dispatch(openComponent(UIComponents.Menu))}
          aria-label='Toogle Menu'
        >
          <MenuIcon className='w-6 h-6' />
        </button>
        <Link to='/' className='p-3' aria-label='Go to Hola Store home'>
          <HolaStoreLogo className='h-6 md:h-8' />
        </Link>
        <nav
          className={`${
            showMenu ? 'translate-x-0' : 'translate-x-[-100%]'
          } bg-light fixed z-10 top-0 left-0 w-full h-screen py-2 transition-transform duration-500 md:static md:block md:h-auto md:py-0 md:translate-x-0 md:bg-transparent`}
        >
          <ul className='flex flex-col px-4 md:flex-row md:px-0'>
            <li className='flex justify-between items-center md:hidden'>
              <HolaStoreLogo className='h-6' />
              <button
                className='p-3 pr-0'
                onClick={() => dispatch(closeComponent(UIComponents.Menu))}
                aria-label='Close menu'
              >
                <CloseIcon className='h-6' />
              </button>
            </li>
            {navigation.map(link => (
              <li
                className='py-4 md:px-3'
                key={link.title}
                onClick={() => dispatch(closeComponent(UIComponents.Menu))}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? 'font-semibold' : ''
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={`${
            showSearchbar ? 'translate-x-0 z-10' : 'translate-x-full'
          } fixed bg-light w-full h-[calc(100vh-64px)] top-16 left-0 p-4 border-t border-neutral transition-transform duration-500 md:top-20 md:h-[calc(100vh-80px)] lg:translate-x-0 lg:static lg:h-auto lg:border-none lg:p-0 lg:max-w-xs`}
        >
          <form
            className='max-w-7xl m-auto flex border border-neutral rounded bg-light'
            onSubmit={handleSearch}
          >
            <input
              type='text'
              name='title'
              required
              placeholder='Search products...'
              className='w-full px-4 py-3 rounded text-gray placeholder:text-red-neutral'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className='text-xl p-3' aria-label='Search products'>
              <SearchIcon className='w-6 h-6' />
            </button>
          </form>
        </div>

        <div className='relative ml-auto'>
          <button
            className='text-xl p-3'
            aria-label='Toggle user menu'
            onClick={() =>
              showUserDropdown
                ? dispatch(closeComponent(UIComponents.UserDropdown))
                : dispatch(openComponent(UIComponents.UserDropdown))
            }
          >
            <UserIcon className='w-6 h-6' />
          </button>
          {showUserDropdown && (
            <ul className='absolute mt-2 top-10 right-0 border border-neutral bg-light rounded drop-shadow md:top-auto divide-y'>
              {!user.email && (
                <>
                  <li>
                    <Link
                      to='/login'
                      state={{ prevLocation: location.pathname }}
                      className='block whitespace-pre p-2 px-4'
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/sign-up'
                      state={{ prevLocation: location.pathname }}
                      className='block whitespace-pre p-2 px-4'
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
              {user.email && (
                <>
                  <li>
                    <Link
                      to='/profile'
                      className='block whitespace-pre p-2 px-4'
                    >
                      My profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/orders'
                      className='block whitespace-pre p-2 px-4'
                    >
                      My orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className='block w-full whitespace-pre p-2 px-4 bg-primary/10 text-primary'
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
        <button
          className='text-xl p-3 lg:hidden'
          aria-label='Toggle searchbar'
          onClick={() =>
            showSearchbar
              ? dispatch(closeComponent(UIComponents.Searchbar))
              : dispatch(openComponent(UIComponents.Searchbar))
          }
        >
          <SearchIcon className='w-6 h-6' />
        </button>
        <button
          className='text-xl p-3 relative'
          onClick={() => dispatch(openComponent(UIComponents.ShoppingCart))}
          aria-label='Toggle shopping cart'
        >
          <span className='absolute text-light text-xs top-5 left-1/2 -translate-x-1/2'>
            {cartQuantity > 9 ? '+9' : cartQuantity}
          </span>
          <CartIcon
            className='w-6 h-6 text-primary'
            accentColor='text-secondary'
          />
        </button>
      </div>
    </header>
  )
}

export default Navbar
