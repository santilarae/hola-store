import React from 'react'
import BackgroundFigures from '../components/BackgroundFigures'
interface LoginLayoutProps {
  children: React.ReactNode
  formPosition: 'left' | 'right'
}
const LoginLayout = ({ children, formPosition }: LoginLayoutProps) => {
  return (
    <div className='relative grid items-center min-h-screen p-4 lg:p-0 lg:grid-cols-5'>
      <div
        className={` ${
          formPosition === 'right' ? 'lg:order-1' : ''
        } max-w-sm mx-auto bg-light px-8 py-16 rounded-md shadow-lg border lg:col-span-2 lg:shadow-none lg:border-0`}
      >
        {children}
      </div>
      <BackgroundFigures
        className='fixed top-0 left-0 w-full h-screen -z-10 lg:static lg:col-span-3'
        preserveAspectRatio='xMidYMin slice'
      />
    </div>
  )
}

export default LoginLayout
