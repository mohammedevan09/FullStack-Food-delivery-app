import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import delivery from '../assets/img/logo.png'
import { buttonClick, staggerFadeInOut } from '../animations'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api'
import { setAllProducts } from '../context/reducers/productsReducer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let products = useSelector((state) => state?.products?.state)

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data))
      })
    }
  }, [])

  // console.log(products)

  return (
    <>
      <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col items-start justify-center gap-6">
          <div className="py-1 flex items-center justify-start gap-2 bg-black text-white fastest-delivery">
            <p className="text-3xl font-semibold text-white-500">
              Fastest Delivery
            </p>
            <div className="w-10 h-10 flex items-center justify-center rounded-full shadow-md">
              <img
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp1LwhKwleRaoHnx5QuSPUCbBDZL34lpIzKVhkteIi-fac9Lu5kUxYt3Ri81nfWEN90Fg&usqp=CAU'
                }
                alt="Delivery"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <p className="text-[40px] text-white md:text-[72px] font-semibold tracking-wider">
            <span className="text-red-300">Less then 30 minutes Delivery </span>
            in your town.
          </p>

          <p className="text-white text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
            explicabo nostrum sunt error nemo cum veritatis sit quia. Sunt,
            autem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <motion.button
            {...buttonClick}
            className="px-4 py-2 rounded-xl text-white text-base font-semibold from-pink-400 to-red-700 bg-gradient-to-bl relative z-10"
            onClick={() => navigate('/menu')}
          >
            Order Now
          </motion.button>
        </div>

        <div className="py-2 flex-1 flex items-center justify-end relative text-white mb-0 sm:mb-24 md:mb-0">
          <img
            src={
              'https://images.pexels.com/photos/3028127/pexels-photo-3028127.jpeg?auto=compress&cs=tinysrgb&w=1600'
            }
            alt=""
            className="absolute top-0 right-0 md:-right-12 w-full h-420 md:w-auto md:h-650 blur-sm object-cover"
          />
          <div className="w-full md:w-460 mt-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
            {products &&
              products.slice(0, 6).map((data, i) => (
                <div key={i}>
                  <motion.div
                    {...staggerFadeInOut(i)}
                    className="w-32 h-36 md:h-auto md:w-190 bg-tran rounded-full flex flex-col items-center justify-center drop-shadow-lg"
                  >
                    <img
                      src={data.imageURL}
                      alt={data.product_name}
                      className="w-24 h-24 md:w-32 md:h-32 md:-mt-16 object-contain rounded-[80px]"
                    />
                    <p className="text-sm lg:text-xl font-semibold text-white">
                      {data.product_name.slice(0, 14)}
                    </p>
                    <p className="text-[12px] text-center md:text-base text-white font-semibold capitalize">
                      {' '}
                      {data.product_category}
                    </p>
                    <p className="text-sm font-semibold text-white">
                      <span className=" text-red-400">$ </span>
                      {''}
                      {data.product_price}
                    </p>
                  </motion.div>
                </div>
              ))}
          </div>
        </div>
      </motion.div>
      <div className="blur-one"></div>
      <div className="blur-two"></div>
      <div className="blur-three"></div>
    </>
  )
}

export default Home
