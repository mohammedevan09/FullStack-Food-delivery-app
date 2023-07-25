import React from 'react'
import { motion } from 'framer-motion'
import Slider from './Slider'

const HomeSlider = () => {
  return (
    <motion.section className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-white font-bold">
            Our Fresh & Healthy cuisine
          </p>
          <div className="w-40 h-1 rounded-md bg-red-400"></div>
        </div>
      </div>

      <Slider />
    </motion.section>
  )
}

export default HomeSlider
