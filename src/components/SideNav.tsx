import React, { HTMLAttributes, MouseEventHandler } from 'react'

import { CloseIcon } from './Icons'

interface SideNavProps {
  show: boolean
  children: React.ReactNode
  onClose: () => void
}

const SideNav = ({ show, children, onClose }: SideNavProps) => {
  const modifiedChildren = React.Children.map(children, child => {
    if (React.isValidElement<SideNavHeaderProps>(child) && child.type === SideNavHeader) {
      return React.cloneElement(child, { onClose })
    }
    return child
  })
  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    if(e.currentTarget === e.target){
      onClose()
    }
  }
  return (
    <div
      className={`${
        show ? 'visible opacity-100 delay-0' : 'invisible opacity-0 delay-200'
      } fixed top-0 left-0 w-full h-screen bg-dark/75 transition-[opacity,visibility] duration-500  z-50`}
      onClick={handleClose}
    >
      <aside
        className={`${
          show ? 'translate-x-0' : 'translate-x-full'
        } w-full h-full bg-light grid grid-rows-[min-content_1fr_min-content] ml-auto shadow-lg sm:max-w-sm transition-transform duration-500`}
      >
        {modifiedChildren}
      </aside>
    </div>
  )
}
interface SideNavHeaderProps {
  title: string
  icon: JSX.Element
  onClose?: () => void
}
const SideNavHeader = ({ title, icon, onClose }: SideNavHeaderProps) => {
  return (
    <header className='p-2 grid grid-cols-[min-content_1fr_min-content] items-center border-b border-neutral'>
      {React.cloneElement(icon, {
        className: `w-6 h-6 m-3 ${icon.props.className}`
      })}
      <span className='text-3xl text-center truncate'>{title}</span>
      <button
        className='p-3'
        onClick={onClose}
        aria-label='Close shopping cart'
      >
        <CloseIcon className='h-6' />
      </button>
    </header>
  )
}

interface SideNavFooterProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}
const SideNavFooter = ({ children, ...props }: SideNavFooterProps) => {
  return <footer {...props}>{children}</footer>
}
const SideNavContent = ({ children }: { children: React.ReactNode }) => {
  return <div className='overflow-y-auto'>{children}</div>
}

export default Object.assign(SideNav, {
  Header: SideNavHeader,
  Content: SideNavContent,
  Footer: SideNavFooter
})
