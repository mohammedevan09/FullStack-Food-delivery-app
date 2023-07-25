import React, { useState } from 'react'
import Logo from '../assets/img/logo.png'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { buttonClick, navButtonClick } from '../animations'
import { TiThMenu } from 'react-icons/ti'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

const DashBLeftSection = ({ showNav, setShowNav }) => {
  const linkTab = [
    { to: 'home', text: 'Home' },
    { to: 'orders', text: 'Orders' },
    { to: 'items', text: 'Items' },
    { to: 'newItem', text: 'Add New Item' },
    { to: 'users', text: 'Users' },
  ]

  return (
    <div
      className={`h-full py-12 flex flex-col backdrop-blur-md shadow-md min-w-210 w-300 gap-3 bg-red-100 sm:flex  ${
        showNav ? ' visible absolute z-10' : ' hidden'
      }`}
    >
      <div className="flex">
        <div>
          <NavLink
            to={'/'}
            className="flex justify-start items-center gap-4 px-6"
          >
            <img src={Logo} className="w-12" alt="Logo" />
            <p className="font-semibold text-xl text-red-500">SpicyX</p>
          </NavLink>
        </div>
        <div>
          <motion.button
            {...buttonClick}
            onClick={() => setShowNav(false)}
            className="absolute top-[9px] right-[18px] text-red-500 text-3xl font-semibold sm:hidden"
          >
            X
          </motion.button>
        </div>
      </div>
      <NavLink
        to={'/'}
        className="flex items-center justify-center gap-4 cursor-pointer text-2xl text-black px-4 py-2 rounded-md border border-red-300 hover:shadow-md"
      >
        <BsFillArrowLeftCircleFill className="text-3xl text-white" /> Get back
        to Home
      </NavLink>

      <hr />

      <ul className="flex flex-col gap-4">
        {linkTab.map((item, id) => (
          <NavLink
            key={id}
            className={({ isActive }) =>
              isActive
                ? 'isActiveStyles px-4 py-2 border-l-[6px] border-red-500 rounded-none'
                : 'isNotActiveStyle text-zinc-500'
            }
            to={`/dashboard/${item.to}`}
          >
            <motion.div {...navButtonClick}>{item.text}</motion.div>
          </NavLink>
        ))}
      </ul>

      <div className="w-full items-center justify-center flex h-225 mt-auto px-2">
        <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">
            Having trouble in city. Please contact us for more questions
          </p>
          <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer">
            Get in touch
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashBLeftSection
