import { HolaStoreLogo } from '../components/Icons'

const AboutUsPage = () => {
  return (
    <section className='flex items-center justify-center px-4 py-8 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] [background:url(/assets/BackgroundAboutUS.svg)_center/cover_no-repeat]'>
      <div className='bg-light w-full max-w-md rounded border border-neutral py-12 px-8 text-center shadow-xl'>
        <HolaStoreLogo className='h-6 mx-auto mb-4' />
        <p className='text-xl'>
          HolaStore is a fake e-commerce website built with Vite, React.js,
          React Router, Redux, Swiper, Tailwind CSS, y TypeScript. Also,
          products are from{' '}
          <a
            className='underline underline-offset-2'
            href='https://fakeapi.platzi.com/'
            target='_blank'
          >
            Platzi Fake Store API
          </a>
          .
        </p>
        <p className='mt-4'> HolaStore | Santiago Lara 2023</p>
      </div>
    </section>
  )
}

export default AboutUsPage
