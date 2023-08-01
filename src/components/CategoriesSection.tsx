import useFetchApi from '../hooks/useFetchApi'
import { ICategory } from '../types/category'
import { Link } from 'react-router-dom'

const CategoriesSection = () => {
  const { data, loading } = useFetchApi<ICategory[]>('/categories')
  return (
    <>
      <section className='px-4'>
        <header className='text-center mb-4 lg:md:mb-6'>
          <h2 className='inline-block uppercase text-2xl font-bold px-4 border-b-4 border-secondary lg:text-3xl'>
            Categories
          </h2>
        </header>
        <div className='flex flex-wrap justify-center space-x-0.5 space-y-0.5 max-w-7xl mx-auto'>
          {data !== null &&
            !loading &&
            data.map(category => (
              <article
                key={category.name}
                className='rounded border border-neutral bg-neutral/10 w-[calc((100%/2)-2px)] sm:w-[calc((100%/3)-2px)] md:w-[calc((100%/4)-2px)] lg:w-[calc((100%/5)-2px)]'
              >
                <Link to={`/category/${category.id}`}>
                  <img
                    className='aspect-square object-cover w-full'
                    src={category.image}
                    alt={category.name}
                  />
                  <p className='p-3 md:p-4 text-center font-bold'>
                    {category.name}
                  </p>
                </Link>
              </article>
            ))}
          {data?.length === 0 && !loading && <div>No categories found</div>}
          {loading && <div>Loading ...</div>}
        </div>
      </section>
    </>
  )
}

export default CategoriesSection
