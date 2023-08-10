import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrder } from '../../types/order'

const ORDERS_KEY = 'orders'

const initialState = (): IOrder[] => {
  const orders = localStorage.getItem(ORDERS_KEY)
  if (orders) {
    return JSON.parse(orders)
  }
  return []
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.push(action.payload)
      const ordersLS = localStorage.getItem(ORDERS_KEY)
      if (!ordersLS) {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(state))
        return
      }
      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify([action.payload, ...JSON.parse(ordersLS)])
      )
    }
  }
})

export const { addOrder } = ordersSlice.actions

export default ordersSlice.reducer
