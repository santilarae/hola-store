import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum UIComponents {
  Menu = 'showMenu',
  Searchbar = 'showSearchbar',
  UserDropdown = 'showUserDropdown',
  ShoppingCart = 'showShoppingCart',
  Filters = 'showFilters',
}

export interface UIState {
  showMenu: boolean
  showSearchbar: boolean
  showUserDropdown: boolean
  showShoppingCart: boolean
  showFilters: boolean
}

const initialState = {
  showMenu: false,
  showSearchbar: false,
  showUserDropdown: false,
  showShoppingCart: false,
  showFilters: false,
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
    },
    closeAllComponent (state) {
      Object.keys(state).forEach(key => {
        state[key as keyof UIState] = false
      })
    },
  }
})

export const { openComponent, closeComponent, closeAllComponent } = uiSlice.actions

export default uiSlice.reducer
