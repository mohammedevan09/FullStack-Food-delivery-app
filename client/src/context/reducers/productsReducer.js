import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: null,
  reducers: {
    setAllProducts: (state, action) => {
      return { state: action.payload }
    },
  },
})

export const { setAllProducts } = productSlice.actions

export default productSlice.reducer
