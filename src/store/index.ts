import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './slices/ui'
import productsReducer from './slices/products'
import cartReducer from './slices/cart'
import userReducer from './slices/user'
import ordersReducer from './slices/orders'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    order: ordersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
