import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum UIComponents {
  Menu = 'showMenu',
  Searchbar = 'showSearchbar',
  UserDropdown = 'showUserDropdown',
  ShoppingCart = 'showShoppingCart'
}

export interface UIState {
  showMenu: boolean
  showSearchbar: boolean
  showUserDropdown: boolean
  showShoppingCart: boolean
}

const initialState = {
  showMenu: false,
  showSearchbar: false,
  showUserDropdown: false,
  showShoppingCart: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openComponent (state, action: PayloadAction<UIComponents>) {
      Object.keys(state).forEach(key => {
        state[key as keyof UIState] = key === action.payload
      })
    },
    closeComponent (state, action: PayloadAction<UIComponents>) {
      state[action.payload as keyof UIState] = false
    }
  }
})

export const { openComponent, closeComponent } = uiSlice.actions

export default uiSlice.reducer
