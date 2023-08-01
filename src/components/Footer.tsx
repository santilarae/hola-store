import { useState } from 'react'
import {
  ArrowIcon,
  FacebookIcon,
  HolaStoreLogo,
  InstagramIcon,
  WhatsappIcon
} from './Icons'

const categoryLinks = ['Clothes', 'Electronics', 'Furniture', 'Shoes', 'Others']
const quickLinks = ['Home', 'Products', 'About Us', 'Contact']
const supportLinks = ['FAQs', 'Help', 'Terms and Conditions', 'Privacy Policy']

interface IFooterSection {
  title: string
  links: string[]
}
const footerSection: IFooterSection[] = [
  { title: 'Categories', links: categoryLinks },
  { title: 'Quick Links', links: quickLinks },
  { title: 'support', links: supportLinks }
]

const Footer = () => {
  return (
    <footer className='border-t-2 border-secondary'>
      <div className='grid grid-cols-1 max-w-7xl mx-auto pt-10 sm:px-4 sm:py-8 sm:gap-8 sm:grid-cols-2 md:grid-cols-4 md:pt-16  md:pb-20'>
        <div className='px-4 border-b-2 border-secondary pb-4 sm:p-0 sm:border-0 '>
          <HolaStoreLogo className='h-8 mb-4 md:mb-6' />
          <p>
            HolaStore is a fake e-commerce website built with React.js, Tailwind
            and Redux. It was made by Santiago Lara in 2023
          </p>
          <div className='flex gap-4 mt-4'>
            <button aria-label="Facebook icon" className='bg-primary p-2 rounded-full'>
              <FacebookIcon className='h-4 text-light fill-current' />
            </button>
            <button aria-label="Instagram icon" className='bg-primary p-2 rounded-full'>
              <InstagramIcon className='h-4 text-light fill-current' />
            </button>
            <button aria-label="Whatsapp icon" className='bg-primary p-2 rounded-full'>
              <WhatsappIcon className='h-4 text-light fill-current' />
            </button>
          </div>
        </div>
        {footerSection.map(section => (
          <FooterSection key={section.title} section={section} />
        ))}
      </div>
      <p className='bg-secondary text-sm px-4 py-6 text-center md:text-base md:py-4'>
        Copyright © 2023 Hola Store. All rights reserved | Designed and
        developed by Santiago Lara
      </p>
    </footer>
  )
}

const FooterSection = ({ section }: { section: IFooterSection }) => {
  const [showLinks, setShowLinks] = useState<boolean>(false)
  return (
    <div
      key={section.title}
      className='border-b-2 border-secondary sm:border-0'
    >
      <button
        className='flex w-full justify-between uppercase font-bold p-4 text-lg items-center sm:hidden'
        onClick={() => setShowLinks(!showLinks)}
      >
        {section.title}{' '}
        <ArrowIcon
          className={`${
            showLinks ? 'rotate-180' : ''
          } h-6 transition-transform duration-500`}
        />
      </button>
      <span className='hidden uppercase font-bold border-b-2 border-secondary text-lg mb-3 pr-8 sm:inline-block '>
        {section.title}
      </span>
      <ul
        className={`${
          showLinks
            ? 'px-4 pb-4 text-base opacity-100'
            : 'text-[0px] opacity-0 leading-none'
        } transition-[font,line-height,opacity,padding,clip-path] duration-500 ease-in-out sm:text-base sm:opacity-100 md:space-y-3`}
      >
        {section.links.map(link => (
          <li key={section.title + link}>
            <span className='cursor-pointer underline-offset-2 underline decoration-1'>
              {link}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
