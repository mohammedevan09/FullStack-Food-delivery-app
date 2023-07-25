import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdLogout, MdSearch } from 'react-icons/md'
import { BsToggles2, BsFillBellFill } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { buttonClick } from '../animations'
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { useNavigate } from 'react-router-dom'
import { success } from './AlertMessage'
import { setUser } from '../context/reducers/userReducers'
import { TiThMenu } from 'react-icons/ti'

const DashHeader = ({ setShowNav }) => {
  const user = useSelector((state) => state?.user)
  const [inputVal, setInputVal] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const firebaseAuth = getAuth(app)

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        success('Sign Out Successfully!')
        dispatch(setUser(null))
        navigate('/login', { replace: true })
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = () => {
    navigate(`/dashboard/${inputVal}`)
  }

  return (
    <nav className="w-full sm:flex grid items-center justify-center sm:justify-between md:gap-3 gap-0 ">
      <p className="sm:text-2xl text-sm text-red-300">
        Welcome to SpicyX
        {user?.name && (
          <span className="block text-base text-gray-300">{`Hello ${user?.name}..?`}</span>
        )}
      </p>

      <div className="flex items-center justify-center gap-4 mt-2">
        <motion.button
          {...buttonClick}
          onClick={() => setShowNav(true)}
          className="-ml-[8px] -mr-2"
        >
          <TiThMenu className="text-3xl sm:hidden" />
        </motion.button>

        <div className="flex items-center justify-center gap-3 px-4 sm:py-2 py-1 bg-red-100 backdrop-blur-md rounded-md shadow-sm md:w-full w-">
          <MdSearch
            className="text-red-500 text-md md:text-2xl cursor-pointer"
            onClick={handleSearch}
          />
          <input
            type="text"
            className="bg-red-100 md:w-full w-[90px] outline-none text-black"
            placeholder="Search Here..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <BsToggles2
            className="text-red-500 text-md md:text-2xl cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        <motion.div
          {...buttonClick}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-md cursor-pointer bg-red-100 backdrop-blur-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-red-500 text-xl" />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={
                user?.picture
                  ? user?.picture
                  : 'https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png'
              }
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            {...buttonClick}
            onClick={signOut}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-md cursor-pointer bg-red-100 backdrop-blur-md shadow-md flex items-center justify-center"
          >
            <MdLogout className="text-red-500 text-xl" />
          </motion.div>
        </div>
      </div>
    </nav>
  )
}

export default DashHeader
