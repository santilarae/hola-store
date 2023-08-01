import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { UIComponents, closeComponent, openComponent } from '../store/slices/ui'
import {
  CartIcon,
  CloseIcon,
  HolaStoreLogo,
  MenuIcon,
  SearchIcon,
  UserIcon
} from './Icons'

const navigation = [
  { to: '/', title: 'Home' },
  { to: '/products', title: 'Products' },
  { to: '/about-us', title: 'About us' },
  { to: '/contact', title: 'Contact' }
]

const Navbar = () => {
  const { showMenu, showSearchbar, showUserDropdown } = useAppSelector(
    state => state.ui
  )
  const dispatch = useAppDispatch()

  return (
    <header className='sticky top-0 left-0 py-2 px-4 border-b border-neutral/50 md:py-3 bg-light z-40'>
      <div className='flex items-center max-w-7xl m-auto'>
        <button
          className='text-xl p-3 w-12 h-12 relative md:hidden'
          onClick={() => dispatch(openComponent(UIComponents.Menu))}
        >
          <MenuIcon className='w-6 h-6' />
        </button>
        <a href='/' className='p-3'>
          <HolaStoreLogo className='h-6 md:h-8' />
        </a>
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
          <form className='max-w-7xl m-auto flex border border-neutral rounded bg-light '>
            <input
              type='text'
              placeholder='Search products...'
              className='w-full px-4 py-3 rounded text-gray placeholder:text-red-neutral'
            />
            <button className='text-xl p-3'>
              <SearchIcon className='w-6 h-6' />
            </button>
          </form>
        </div>

        <div className='relative ml-auto'>
          <button
            className='text-xl p-3'
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
              <li>
                <a href='' className='block whitespace-pre p-2 px-4'>
                  My profile
                </a>
              </li>
              <li>
                <a href='' className='block whitespace-pre p-2 px-4'>
                  My profile
                </a>
              </li>
              <li>
                <a href='' className='block whitespace-pre p-2 px-4'>
                  My profile
                </a>
              </li>
            </ul>
          )}
        </div>
        <button
          className='text-xl p-3 lg:hidden'
          onClick={() =>
            showSearchbar
              ? dispatch(closeComponent(UIComponents.Searchbar))
              : dispatch(openComponent(UIComponents.Searchbar))
          }
        >
          <SearchIcon className='w-6 h-6' />
        </button>
        <button
          className='text-xl p-3'
          onClick={() => dispatch(openComponent(UIComponents.ShoppingCart))}
        >
          <CartIcon className='w-6 h-6' />
        </button>
      </div>
    </header>
  )
}

export default Navbar
