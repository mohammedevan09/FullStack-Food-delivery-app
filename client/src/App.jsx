import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import { getAuth } from 'firebase/auth'
import { app } from './config/firebase.config'
import { getAllCartItems, getAllProducts, validateUserJWTToken } from './api'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './context/reducers/userReducers'
import { motion } from 'framer-motion'
import { fadeInOut } from './animations'
import MainLoader from './components/MainLoader'
import Dashboard from './pages/Dashboard'
import { setAllProducts } from './context/reducers/productsReducer'
import { setCart } from './context/reducers/cartItemsReducer'
import Cart from './components/Cart'
import CheckOutSuccess from './components/CheckOutSuccess'
import Menu from './pages/Menu'
import About from './components/About'
import Product from './pages/Product'
import Footer from './components/Footer'

function App() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state?.user)
  const products = useSelector((state) => state?.products?.state)

  useMemo(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data))
      })
    }
  }, [products])

  const firebaseAuth = getAuth(app)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) =>
          validateUserJWTToken(token).then((data) => {
            dispatch(setUser(data))
            // console.log(data)
            getAllCartItems(data?.user_id).then((items) => {
              dispatch(setCart(items))
              // console.log(items)
            })
          })
        )
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <>
      <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
        {isLoading && (
          <motion.div
            {...fadeInOut}
            className="fixed z-50 inset-0 bg-black backdrop-blur-md flex items-center justify-center w-full text-white"
          >
            <MainLoader />
          </motion.div>
        )}
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/menu/*" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/cart/*" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout-success" element={<CheckOutSuccess />} />
        </Routes>
      </div>
    </>
  )
}

export default App
