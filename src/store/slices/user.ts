import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/user'

const USER_KEY = 'user'

const initialState = (): IUser => {
  const user = localStorage.getItem(USER_KEY)
  if (user) {
    return JSON.parse(user)
  }
  return {
    username: null,
    email: null,
    password: null
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload))
      state.username = action.payload.username
      state.email = action.payload.email
      state.password = action.payload.username
    },
    logoutUser: state => {
      localStorage.removeItem(USER_KEY)
      state.username = null
      state.email = null
      state.password = null
    }
  }
})
export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
