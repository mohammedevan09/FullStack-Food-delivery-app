import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userReducers'
import productsReducer from './productsReducer'
import allUserReducer from './allUserReducer'
import cartItemsReducer from './cartItemsReducer'

const myReducers = combineReducers({
  user: userReducer,
  products: productsReducer,
  allUser: allUserReducer,
  cartItems: cartItemsReducer,
})

export const store = configureStore({
  reducer: myReducers,
})
