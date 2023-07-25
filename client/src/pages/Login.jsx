import React, { useEffect, useState } from 'react'
import loginImage from '../assets/img/login.jpg'
import Logo from '../assets/img/logo.png'
import LoginInput from '../components/LoginInput'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'
import { buttonClick } from '../animations'
import { useNavigate } from 'react-router-dom'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { app } from '../config/firebase.config.js'
import { validateUserJWTToken } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../context/reducers/userReducers'
import { error, success } from '../components/AlertMessage'
import Footer from '../components/Footer'

const Login = () => {
  const [userEmail, setUserEmail] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state?.user)

  useEffect(() => {
    user && navigate('/')
  }, [user])

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred
            .getIdToken()
            .then((token) =>
              validateUserJWTToken(token).then((data) =>
                dispatch(setUser(data))
              )
            )
          success('Google sign in Successfully!')
          navigate('/', { replace: true })
        }
      })
    })
  }

  const signUpWithEmailPass = async () => {
    if (userEmail === '' || password === '' || confirmPass === '') {
      error('Please fill up all!')
    } else {
      if (password === confirmPass) {
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) =>
                validateUserJWTToken(token).then((data) => {
                  setConfirmPass('')
                  setUserEmail('')
                  setPassword('')
                  dispatch(setUser(data))
                  success('Sign Up Successfully!')
                })
              )
              navigate('/', { replace: true })
            }
          })
        })
      } else {
        error('password does not match!')
      }
    }
  }

  const signInWithEmailPass = async () => {
    if (userEmail !== '' && password !== '') {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) =>
                validateUserJWTToken(token).then((data) => {
                  setConfirmPass('')
                  setUserEmail('')
                  setPassword('')
                  dispatch(setUser(data))
                  success('Sign in Successfully!')
                })
              )
              navigate('/', { replace: true })
            }
          })
        }
      )
    } else {
      error('Sign In Failed!')
    }
  }

  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden flex">
        <img
          src={loginImage}
          className="w-full h-full object-cover absolute top-0 left-0"
          alt="loginImage"
        />

        {/* contents */}
        <div className="flex flex-col items-center bg-trans sm:w-[60%] md:w-508 w-[100%] h-full z-10 backdrop-blur-sm p-4 px-4 py-12">
          {/* Logo */}
          <div className="flex items-center justify-start gap-2 w-full mb-32">
            <img src={Logo} className="w-16" alt="Logo" />
            <p className="text-red-500 font-semibold text-2xl">SpicyX</p>
          </div>

          {/* wel text */}
          <p className="text-3xl font-semibold text-red-400">Welcome Back</p>
          <p className="text-md text-red-300">
            {isSignUp ? 'Sing up Now!' : 'Sing in'}
          </p>

          {/* input */}
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
            <LoginInput
              placeholder={'Email here'}
              icon={<FaEnvelope className="text-xl text-textColor" />}
              inputState={userEmail}
              inputStateFunction={setUserEmail}
              type="email"
              isSignUp={isSignUp}
            />
            <LoginInput
              placeholder={'Password here'}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={password}
              inputStateFunction={setPassword}
              type="password"
              isSignUp={isSignUp}
            />

            {isSignUp && (
              <LoginInput
                placeholder={'Confirm Password'}
                icon={<FaLock className="text-xl text-textColor" />}
                inputState={confirmPass}
                inputStateFunction={setConfirmPass}
                type="password"
                isSignUp={isSignUp}
              />
            )}

            {!isSignUp ? (
              <p className="text-white">
                Doesn't have an account,{' '}
                <motion.button
                  {...buttonClick}
                  className="text-red-400 underline cursor-pointer bg-transparent"
                  onClick={() => setIsSignUp(true)}
                >
                  Create One?
                </motion.button>{' '}
              </p>
            ) : (
              <p className="text-white">
                Already have an account,{' '}
                <motion.button
                  {...buttonClick}
                  className="text-red-400 underline cursor-pointer bg-transparent"
                  onClick={() => setIsSignUp(false)}
                >
                  Log in?
                </motion.button>{' '}
              </p>
            )}

            {/* button */}
            {isSignUp ? (
              <motion.button
                {...buttonClick}
                className="w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-400 transition-all duration-150"
                onClick={signUpWithEmailPass}
              >
                Sign Up
              </motion.button>
            ) : (
              <motion.button
                {...buttonClick}
                className="w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-400 transition-all duration-150"
                onClick={signInWithEmailPass}
              >
                Sign In
              </motion.button>
            )}
          </div>

          <div className="flex items-center justify-between gap-16 mt-2">
            <div className="w-28 h-[1px] rounded-md bg-zinc-500"></div>
            <p className="text-zinc-300">or</p>
            <div className="w-28 h-[1px] rounded-md bg-zinc-500"></div>
          </div>

          <motion.div
            {...buttonClick}
            className="flex items-center justify-center md:px-20 px-10 py-2 mt-6 bg-trans2 cursor-pointer rounded-3xl gap-4"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-3xl" />
            <p className="capitalize text-base text-black font-bold">
              Sign with Google
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
