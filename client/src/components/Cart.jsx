import React from 'react'
import { buttonClick, fadeInOut } from '../animations'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import login from '../assets/img/login.jpg'
import {
  addNewItemToCart,
  baseURL,
  deleteFromCart,
  getAllCartItems,
} from '../api'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { error, info, success, warn } from './AlertMessage.jsx'
import { setCart } from '../context/reducers/cartItemsReducer'
import Header from './Header.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

const Cart = () => {
  const user = useSelector((state) => state.user)
  const cartItems = useSelector((state) => state.cartItems)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let cartCount = {}
  if (cartItems) {
    cartCount = cartItems.reduce(
      (acc, curr) => {
        const { quantity, product_price } = curr

        acc.total_items += quantity
        acc.total_price += +product_price * quantity

        return acc
      },
      { total_items: 0, total_price: 0 }
    )
  }
  //   console.log(cartCount)

  const addItem = (data) => {
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
  }

  const removeItem = (productId) => {
    info('Removing Item from cart!')
    deleteFromCart(user?.user_id, productId)
      .then((res) => {
        getAllCartItems(user?.user_id).then((items) => {
          success('Removed from the cart!')
          dispatch(setCart(items))
        })
      })
      .catch((err) => {
        error('Cannot Remove from the cart!')
      })
  }

  const handleCheckOut = () => {
    if (user !== null) {
      const data = {
        user: user,
        cartItem: cartItems,
        total: cartCount,
      }
      // console.log(data)

      axios
        .post(`${baseURL}/api/products/create-checkout-session`, { data })
        .then((res) => {
          console.log(res)
          if (res?.data?.url) {
            window.location.href = res?.data?.url
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      error('Sorry you need to login first')
      navigate('/login')
    }
  }

  if ((cartItems && cartItems?.length === 0) || !cartItems) {
    return (
      <section className="min-h-screen w-screen text-black ">
        <Header />
        <img
          src={login}
          className="fixed w-screen h-screen -z-10 object-cover"
        />
        <h1 className="text-white text-center mt-36 font-semibold backdrop-blur-md md:text-[56px] text-xl">
          No Product Selected!
        </h1>
        <motion.button
          {...buttonClick}
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-4 cursor-pointer text-2xl text-white px-4 py-2 rounded-md border border-red-300 hover:shadow-md text-center mx-auto my-12 bg-black"
        >
          <BsFillArrowLeftCircleFill className="text-3xl text-white" /> Get back
          to Home
        </motion.button>
      </section>
    )
  }

  return (
    <section className="min-h-screen w-screen text-black">
      <Header />
      <img src={login} className="fixed w-screen h-screen -z-10 object-cover" />
      <motion.div {...fadeInOut}>
        <div className="backdrop-blur-sm mt-32">
          {cartItems?.map((data, i) => (
            <div
              key={i}
              className="flex items-center justify-around gap-5 mb-14 bg-trans backdrop-blur-md text-white"
            >
              {' '}
              <img
                className="md:w-40 md:h-40 h-20 w-20 object-cover rounded-full"
                src={data?.imageURL}
                alt={data?.product_name}
              />{' '}
              <div className="line"></div>
              <motion.div
                {...buttonClick}
                className="md:w-8 md:h-8 w-6 h-6 text-3xl font-semibold bg-white rounded-[50%] text-black flex justify-center items-center cursor-pointer"
                onClick={() => removeItem(data?.productId)}
              >
                -
              </motion.div>
              <div className="text-2xl">{data?.quantity}</div>
              <motion.div
                {...buttonClick}
                className="text-black md:w-8 md:h-8 w-6 h-6 md:text-3xl text-2xl font-semibold bg-white rounded-[50%] flex justify-center items-center cursor-pointer"
                onClick={() => addItem(data)}
              >
                +
              </motion.div>
              <div className="line"></div>
              <div className="grid justify-between items-stretch gap-1 md:gap-3">
                <div className="w-30 md:w-56 md:text-2xl text-sm">
                  Name :- {data?.product_name}
                </div>
                <div className="w-30 md:w-56 md:text-2xl text-sm">
                  Category :- {data?.product_category}
                </div>
                <div className="w-30 md:w-56 md:text-2xl text-sm">
                  Price :- ${data?.product_price}
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="relative top-14" />
        <div className="bg-trans backdrop-blur-md text-white font-semibold flex justify-around items-center text-3xl h-40">
          <div className="w-30 md:w-56">Total</div>
          <div className="h-line"></div>
          <div className="w-30 md:w-56 text-center md:mr-12 mr-0">
            {cartCount?.total_items}
          </div>
          <div className="h-line"></div>
          <div className="w-30 md:w-56 text-center">
            ${cartCount?.total_price}
          </div>
        </div>
        <motion.div {...fadeInOut}>
          <div className="bg-trans2 text-right">
            <motion.button
              {...buttonClick}
              className="font-semibold text-2xl bg-black text-white p-3 rounded-md backdrop-blur-md m-6 md:text-[56px] md:p-6"
              onClick={handleCheckOut}
            >
              Check Out
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </section>
  )
}

export default Cart
