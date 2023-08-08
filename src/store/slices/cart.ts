import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct, IProductCart } from '../../types/products'

interface initialStateType {
  products: IProductCart[]
}
const initialState: initialStateType = {
  products: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      if (index >= 0) {
        if (state.products[index].quantity < 10) {
          state.products[index].quantity++
        }
      } else {
        state.products.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct['id']>) => {
      const index = state.products.findIndex(p => p.id === action.payload)
      if (index >= 0) {
        state.products.splice(index, 1)
      }
    },
    updateProductQty: (
      state,
      action: PayloadAction<{ id: IProduct['id']; qty: number }>
    ) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      if (index >= 0) {
        state.products[index].quantity = action.payload.qty
      }
    }
  }
})

export const { addToCart, removeFromCart, updateProductQty } = cartSlice.actions

export default cartSlice.reducer
