import React from 'react'
import Header from './Header.jsx'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { buttonClick } from '../animations/index.js'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import bill from '../assets/img/bill.png'

const CheckOutSuccess = () => {
  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-black">
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <img src={bill} alt="" className="w-full md:w-656" />
        <h1 className="text-[58px] text-white font-bold text-center">
          Amount paid Successfully
        </h1>

        <motion.div {...buttonClick}>
          <NavLink
            to={'/'}
            className="flex items-center justify-center gap-4 cursor-pointer text-2xl text-white px-4 py-2 rounded-md border border-red-300 hover:shadow-md"
          >
            <BsFillArrowLeftCircleFill className="text-3xl text-white" /> Get
            back to Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  )
}

export default CheckOutSuccess
