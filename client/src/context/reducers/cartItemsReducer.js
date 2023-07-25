import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: null,
  reducers: {
    setCart: (state, action) => {
      return action.payload
    },
  },
})

export const { setCart } = cartSlice.actions

export default cartSlice.reducer
