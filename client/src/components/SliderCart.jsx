import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { buttonClick, staggerFadeInOut } from '../animations'
import { AiFillShopping } from 'react-icons/ai'
import '../assets/css/slider.css'
import { useDispatch, useSelector } from 'react-redux'
import { addNewItemToCart, getAllCartItems } from '../api'
import { error, info, success } from './AlertMessage'
import { setCart } from '../context/reducers/cartItemsReducer'
import { useNavigate } from 'react-router-dom'

const SliderCart = ({ data, index }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const sendToCart = () => {
    if (user) {
      info('Adding Item to cart!')
      addNewItemToCart(user?.user_id, data)
        .then((res) => {
          getAllCartItems(user?.user_id).then((items) => {
            success('Added to the cart!')
            dispatch(setCart(items))
          })
        })
        .catch((err) => {
          error('Cannot add to the cart!')
        })
    } else {
      error('You need to login first!')
      navigate('/login')
    }
  }

  return (
    <div className="cart-css md:flex grid md:w-full w-52 xl:h-full h-52 ">
      <img
        src={data?.imageURL}
        alt={data?.product_name}
        className="md:w-48 md:h-40 w-28 h-20 object-contain"
      />
      <div className="relative grid justify-between md:gap-14 gap-3">
        <motion.div
          onClick={sendToCart}
          {...buttonClick}
          {...staggerFadeInOut(index)}
          className="md:w-8 md:h-8 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center cursor-pointer text-left "
        >
          <AiFillShopping className="md:text-2xl text-base text-white svg" />
        </motion.div>
        <div className="relative grid gap-0 md:gap-3">
          <p className="text-base md:text-xl text-white font-semibold text-left">
            {data?.product_name.substr(0, 6)}...
          </p>
          <p className="text-lg font-semibold text-red-300 text-left">
            ${Number(data?.product_price).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SliderCart
