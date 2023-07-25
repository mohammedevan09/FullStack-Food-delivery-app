import React from 'react'
import Header from '../components/Header'
import FilterSections from '../components/FilterSections'
import { fadeInOut } from '../animations'
import { motion } from 'framer-motion'
import HomeSlider from '../components/HomeSlider'

const Menu = () => {
  return (
    <motion.div {...fadeInOut} className="bg-black w-screen h-screen">
      <Header />
      <div className="mt-32"></div>
      <HomeSlider />
      <div className="mt-16"></div>
      <FilterSections />
    </motion.div>
  )
}

export default Menu
