import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../types/products'
import { AppDispatch, RootState } from '..'
import { getProducts } from '../../services/products'
import { ICategory } from '../../types/category'

export enum Sort {
  DEFAULT = 'MOST POPULAR',
  NEWEST = 'NEWEST',
  PRICE_ASC = 'PRICE (LOW - HIGH)',
  PRICE_DESC = 'PRICE (HIGH - LOW)'
}

export interface IFilters {
  price_min?: number
  price_max?: number
  category?: ICategoryFilters
  title?: string
  sort: Sort
}

interface ICategoryFilters extends ICategory {
  productQuantity: number
}

interface InitialStateType {
  products: IProduct[]
  filters: IFilters
  error: null | Error
  loading: boolean
  lowestPrice: null | number
  highestPrice: null | number
  categories: ICategoryFilters[]
}

const initialState: InitialStateType = {
  products: [],
  filters: { sort: Sort.DEFAULT },
  lowestPrice: null,
  highestPrice: null,
  categories: [],
  error: null,
  loading: true
}

export const fetchProducts = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('products/fetchProducts', async (_, { dispatch }) => {
  dispatch(setLoading(true))
  try {
    const products = await getProducts<IProduct[]>()
    dispatch(setProducts(products))
  } catch (error) {
    if (error instanceof Error) dispatch(setError(error))
  } finally {
    dispatch(setLoading(false))
  }
})

const getCategories = (products: IProduct[]): ICategoryFilters[] =>
  products.reduce<ICategoryFilters[]>((prev, curr) => {
    const categoryIndex = prev.findIndex(category => category.id === curr.category.id)
    if (categoryIndex >= 0) {
      prev[categoryIndex].productQuantity += 1
      return prev
    }
    return [...prev, { ...curr.category, productQuantity: 1 }]
  }, [])

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      const reorderProducts = [...action.payload].sort((a, b) => a.price - b.price)
      state.lowestPrice = reorderProducts[0].price
      state.highestPrice = reorderProducts[reorderProducts.length - 1].price
      state.products = action.payload
      state.categories = getCategories([...action.payload])
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
    },
    setFilters: (state, action: PayloadAction<IFilters>) => {
      state.filters = action.payload
    },
    resetFilter: (state, action: PayloadAction<keyof IFilters>)=> {
      delete state.filters[action.payload]
    }
  }
})

export const { setProducts, setLoading, setError, setFilters, resetFilter } =
  productsSlice.actions

export default productsSlice.reducer
