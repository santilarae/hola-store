import React, {
  ChangeEventHandler,
  HtmlHTMLAttributes,
  useEffect,
  useState
} from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { Sort, setFilters } from '../store/slices/products'
import { UIComponents, closeComponent } from '../store/slices/ui'
import { ArrowIcon, FiltersIcon } from './Icons'
import SideNav from './SideNav'

const Filters = () => {
  const { showFilters } = useAppSelector(state => state.ui)
  const { filters, categories, lowestPrice, highestPrice } = useAppSelector(
    state => state.products
  )
  const [selectedFilters, setSelectedFilters] =
    useState<typeof filters>(filters)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (showFilters) {
      setSelectedFilters(filters)
    }
  }, [showFilters])

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = e => {
    const keyStrToNum = ['category', 'price_min', 'price_max']
    const key = e.target.name
    let value: any = keyStrToNum.includes(key)
      ? Number(e.target.value)
      : e.target.value
    if (key === 'category') {
      value = categories.find(c => c.id === value)
    }
    setSelectedFilters(prev => ({ ...prev, [key]: value }))
  }

  const submitFiltersForm = () => {
    dispatch(
      setFilters({ ...selectedFilters, title: selectedFilters.title?.trim() })
    )
    dispatch(closeComponent(UIComponents.Filters))
  }

  const handleClose = () => dispatch(closeComponent(UIComponents.Filters))
  return (
    <SideNav show={showFilters} onClose={handleClose}>
      <SideNav.Header
        title='Filters'
        icon={
          <FiltersIcon className='text-primary' accentColor='text-secondary' />
        }
      />
      <SideNav.Content>
        <FiltersTab title='Sort by'>
          <div className='space-y-4'>
            {Object.values(Sort).map((value, index) => (
              <label
                key={`sort${index}`}
                htmlFor={`sort${index}`}
                className='flex w-full justify-between items-center cursor-pointer'
              >
                {value}
                <input
                  type='radio'
                  className='hidden'
                  name='sort'
                  value={value}
                  id={`sort${index}`}
                  onChange={handleOnChange}
                />
                <span
                  className={`
                    ${selectedFilters.sort === value ? 'bg-primary' : ''}
                    block w-4 h-4 border-2 border-light rounded-full bg-light outline outline-1 outline-neutral`}
                ></span>
              </label>
            ))}
          </div>
        </FiltersTab>
        <FiltersTab title='Title'>
          <input
            className='border border-neutral w-full px-4 py-3 rounded placeholder:text-neutral'
            type='text'
            placeholder='Red shoe'
            value={selectedFilters.title || ''}
            name='title'
            onChange={handleOnChange}
          />
        </FiltersTab>
        {lowestPrice && highestPrice && (
          <FiltersTab title='Price'>
            <div className='relative text-center mt-2'>
              <input
                type='range'
                name='price_min'
                id=''
                className='range-price'
                onChange={handleOnChange}
                min={lowestPrice}
                value={
                  selectedFilters.price_min
                    ? selectedFilters.price_min
                    : lowestPrice
                }
                max={highestPrice}
              />
              <input
                type='range'
                name='price_max'
                id=''
                className='range-price'
                onChange={handleOnChange}
                min={lowestPrice}
                value={
                  selectedFilters.price_max
                    ? selectedFilters.price_max
                    : highestPrice
                }
                max={highestPrice}
              />
              <span>
                $
                {selectedFilters.price_min
                  ? selectedFilters.price_min
                  : lowestPrice}{' '}
                - $
                {selectedFilters.price_max
                  ? selectedFilters.price_max
                  : highestPrice}
              </span>
            </div>
          </FiltersTab>
        )}
        <FiltersTab title='Categories'>
          <div className='flex flex-wrap gap-2 mt-1'>
            {categories.map(category => (
              <label
                htmlFor={`category-${category.id}`}
                key={`category-${category.id}`}
              >
                <input
                  type='radio'
                  className='hidden'
                  name='category'
                  value={category.id || ''}
                  id={`category-${category.id}`}
                  onChange={handleOnChange}
                  defaultChecked={selectedFilters.category?.id === category.id}
                />
                <span
                  className={`block rounded cursor-pointer border-2 px-3 py-2 select-none ${
                    selectedFilters.category?.id === category.id
                      ? 'border-primary'
                      : ''
                  }`}
                >
                  {category.name}{' '}
                  <span className='text-dark/50 text-sm'>
                    [{category.productQuantity}]
                  </span>
                </span>
              </label>
            ))}
          </div>
        </FiltersTab>
        <button type='submit' className='hidden'></button>
      </SideNav.Content>
      <SideNav.Footer className='p-4'>
        <button
          className='w-full text-center p-2 pt-3 rounded font-bold text-light bg-primary border border-primary uppercase'
          onClick={submitFiltersForm}
        >
          Filtrar
        </button>
      </SideNav.Footer>
    </SideNav>
  )
}

interface FiltersTabProps extends HtmlHTMLAttributes<HTMLDListElement> {
  children: React.ReactNode
  title: string
}

const FiltersTab = ({ children, title }: FiltersTabProps) => {
  const [show, setShow] = useState<boolean>(false)
  const classes = show ? 'block' : 'hidden'
  return (
    <dl className='relative border-b border-neutral'>
      <dt
        className='p-4 text-sm font-bold uppercase cursor-pointer flex justify-between items-center select-none'
        onClick={() => setShow(prev => !prev)}
      >
        <span>{title}</span>
        <ArrowIcon
          className={`${
            show ? 'rotate-180' : ''
          } w-6 h-6 transition-transform duration-300`}
        />
      </dt>
      <dd className={`${classes} p-4 pt-0 w-full`}>{children}</dd>
    </dl>
  )
}

export default Filters
