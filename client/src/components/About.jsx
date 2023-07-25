import React from 'react'
import warning from '../assets/img/warning.png'
import banner from '../assets/img/login.jpg'
import Header from './Header'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div className="w-screen h-screen">
      <img
        src={banner}
        className="fixed w-screen h-screen -z-10 object-cover"
      />
      <Header />
      <div className="md:mt-56 mt-28 text-center bg-trans backdrop-blur-md h-full">
        <img src={warning} alt="" className="w-36 h-36 text-center mx-auto" />
        <h1 className="text-[30px] md:text-[56px] text-white md:px-32 px-12">
          This website is made for only practice. This is not in actual use or
          your order won't be actually accepted!
        </h1>
      </div>
    </motion.div>
  )
}

export default About
