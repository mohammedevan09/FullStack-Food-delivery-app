import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { staggerFadeInOut } from '../animations'
import { FaGripfire } from 'react-icons/fa'
import '../assets/css/slider.css'

const FilterSections = () => {
  const [category, setCategory] = useState('fruits')

  let products = useSelector((state) => state?.products?.state)

  return (
    <motion.section className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-white font-bold">Our Hot Dishes</p>
          <div className="w-40 h-1 rounded-md bg-red-400"></div>
        </div>
      </div>
      <div className="w-full overflow-x-scroll xl:overflow-hidden pt-6 flex items-center justify-center gap-6 py-8">
        {products &&
          statuses.map((data, i) => (
            <FilterCard
              key={i}
              data={data}
              category={category}
              setCategory={setCategory}
              index={i}
            />
          ))}
      </div>
      <div className="w-full flex items-center justify-center gap-4 my-12">
        {products &&
          products
            .filter((data) => data?.product_category === category)
            .map((data, i) => <SliderCart key={i} data={data} index={i} />)}
      </div>
    </motion.section>
  )
}
import '../assets/css/slider.css'
import SliderCart from './SliderCart'
import { statuses } from '../dummyData/data'

const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      onClick={() => setCategory(data?.category)}
      {...staggerFadeInOut(index)}
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${
        category === data?.category ? 'bg-red-200 text-center' : 'bg-black'
      } hover:bg-trans shadow-md flex flex-col item-center justify-center gap-4`}
    >
      <div
        className={`w-10 h-10 mx-auto rounded-full shadow-md flex items-center justify-center group-hover:bg-black ${
          category === data?.category ? 'bg-black mx-auto' : 'bg-white'
        }`}
      >
        <FaGripfire
          className={`${
            category === data?.category ? 'text-red-500' : 'text-black'
          }`}
        />
      </div>
      <p
        className={`text-xl font-semibold text-center  ${
          category === data?.category ? 'text-black' : 'text-white'
        }`}
      >
        {data?.title}
      </p>
    </motion.div>
  )
}

export default FilterSections
