import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='bg-hero-mobile bg-cover bg-no-repeat bg-center w-full max-h-[760px] h-[calc(100vh-65px)] md:h-[calc(100vh-81px)] md:bg-hero-desktop'>
      <div className='max-w-7xl h-full m-auto text-light p-4 flex flex-col justify-center items-center text-center md:items-start md:text'>
        <h1 className='text-3xl font-bold md:text-4xl'>BEST PRODUCT</h1>
        <p className='max-w-sm md:text-left'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet
          ornare mauris
        </p>
        <Link
          to='/products'
          className='text-center pb-2 pt-3 px-4 mt-5 rounded font-bold text-light bg-primary border border-primary'
        >
          SHOP NOW
        </Link>
      </div>
    </section>
  )
}

export default Hero
