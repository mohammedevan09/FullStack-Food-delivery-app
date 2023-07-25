import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import '../assets/css/slider.css'
import { useSelector } from 'react-redux'
import SliderCart from './SliderCart'

const Slider = () => {
  // const [fruits, setFruits] = useState([])

  const products = useSelector((state) => state?.products?.state)

  // useMemo(() => {
  //   setFruits(products?.filter((item) => item.product_category !== 'fruitss'))
  // }, [products])
  // console.log(fruits)

  return (
    <div className="bg-black w-full pt-10">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {products &&
          products.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCart key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default Slider
