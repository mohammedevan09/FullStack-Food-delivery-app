import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../assets/img/logo.png'
import { motion } from 'framer-motion'
import { buttonClick, dropdown, navButtonClick } from '../animations'
import Badge from '@mui/material/Badge'
import { MdShoppingCart, MdLogout } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { setUser } from '../context/reducers/userReducers'
import { success } from './AlertMessage'
import { TiThMenu } from 'react-icons/ti'

const Header = () => {
  const user = useSelector((state) => state?.user)
  const cartItems = useSelector((state) => state?.cartItems)

  let cartCount = 0
  if (cartItems) {
    cartCount = cartItems.reduce((acc, curr) => {
      const { quantity } = curr
      return acc + quantity
    }, 0)
  }

  const [isMenu, setIsMenu] = useState(false)
  const [showNav, setShowNav] = useState(false)

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

  return (
    <div
      className="fixed backdrop-blur-sm z-50 inset-x-0 flex top-0 justify-between items-center px-4 md:px-20 py-4
    "
    >
      <NavLink to={'/'} className="flex justify-center items-center gap-4">
        <img src={Logo} className="w-12" alt="Logo" />
        <p className="font-semibold text-xl text-red-500">SpicyX</p>
      </NavLink>

      <nav className="flex justify-center items-center md:gap-4 gap-1">
        <ul className="hidden md:flex justify-center items-center gap-10">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'isActiveStyles' : 'isNotActiveStyle'
            }
            to={'/'}
          >
            <motion.div {...navButtonClick}>Home</motion.div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'isActiveStyles' : 'isNotActiveStyle'
            }
            to={'/menu'}
          >
            <motion.div {...navButtonClick}>Menu</motion.div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'isActiveStyles' : 'isNotActiveStyle'
            }
            to={'/dashboard/home'}
          >
            <motion.div {...navButtonClick}>Dashboard</motion.div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'isActiveStyles' : 'isNotActiveStyle'
            }
            to={'/about'}
          >
            <motion.div {...navButtonClick}>About</motion.div>
          </NavLink>
        </ul>

        <motion.div
          {...buttonClick}
          className="relative cursor-pointer mr-4 mt-3"
          onClick={() => navigate('/cart')}
        >
          <Badge
            badgeContent={cartCount === 0 ? null : cartCount}
            color="secondary"
          >
            <MdShoppingCart className="text-3xl text-red-300" />
          </Badge>
        </motion.div>

        {user ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseOver={() => setIsMenu(true)}
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={
                    user?.picture
                      ? user?.picture
                      : 'https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png'
                  }
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="ro-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  {...dropdown}
                  className="mt-6 px-6 py-4 w-48 bg-white backdrop-blur-md rounded-md shadow-md absolute top-12 -right-6 flex flex-col gap-4"
                  onMouseLeave={() => setIsMenu(false)}
                >
                  <Link className="links" to={'/dashboard/home'}>
                    Dashboard
                  </Link>
                  <Link className="links" to={'/cart'}>
                    Cart
                  </Link>
                  <Link className="links" to={'/menu'}>
                    menu
                  </Link>
                  <hr />
                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-black
                   hover:bg-gray-300 gap-3 transition-all duration-3
                   00"
                  >
                    <MdLogout className="text-2xl text-red-500 group-hover:text-black" />
                    <p className="text-white text-xl group-hover:text-black ">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={'/login'}>
              <motion.div
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md text-black font-semibold
                 bg-white border-red-300 cursor-pointer"
              >
                Login
              </motion.div>
            </NavLink>
          </>
        )}
        <motion.button {...buttonClick} onClick={() => setShowNav(true)}>
          <TiThMenu className="text-3xl ml-3" />
        </motion.button>
        <div>
          <MobileMenu showNav={showNav} setShowNav={setShowNav} />
        </div>
      </nav>
    </div>
  )
}

const MobileMenu = ({ showNav, setShowNav }) => {
  return (
    <ul
      className={`md:hidden grid justify-left items-center gap-0 absolute bg-black w-screen h-[400px] top-0 left-0 transition-all duration-1000 ${
        showNav ? 'visible opacity-100' : 'hidden opacity-0'
      }`}
    >
      <motion.button
        {...buttonClick}
        className="text-red-300 text-left px-6 text-3xl"
        onClick={() => setShowNav(false)}
      >
        X
      </motion.button>
      <NavLink
        className={({ isActive }) =>
          isActive ? 'isActiveStyles' : 'isNotActiveStyle'
        }
        to={'/'}
      >
        <motion.div {...navButtonClick}>Home</motion.div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? 'isActiveStyles' : 'isNotActiveStyle'
        }
        to={'/menu'}
      >
        <motion.div {...navButtonClick}>Menu</motion.div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? 'isActiveStyles' : 'isNotActiveStyle'
        }
        to={'/dashboard/home'}
      >
        <motion.div {...navButtonClick}>Dashboard</motion.div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? 'isActiveStyles' : 'isNotActiveStyle'
        }
        to={'/about'}
      >
        <motion.div {...navButtonClick}>About</motion.div>
      </NavLink>
    </ul>
  )
}

export default Header
