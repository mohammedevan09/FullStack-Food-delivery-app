import { createSlice } from '@reduxjs/toolkit'

export const allUserSlice = createSlice({
  name: 'allUser',
  initialState: null,
  reducers: {
    setAllUser: (state, action) => {
      return action.payload
    },
  },
})

export const { setAllUser } = allUserSlice.actions

export default allUserSlice.reducer
