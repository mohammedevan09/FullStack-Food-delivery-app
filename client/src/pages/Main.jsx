import React from 'react'
import Header from '../components/Header'
import Home from '../components/Home'
import HomeSlider from '../components/HomeSlider'
import FilterSections from '../components/FilterSections'
import Footer from '../components/Footer'

const Main = () => {
  return (
    <main className="w-screen min-h-screen flex items-center justify-center flex-col bg-black">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-14 2xl:px-52 gap-12 pb-24">
        <Home />
        <HomeSlider />
        <FilterSections />
        <Footer />
      </div>
    </main>
  )
}

export default Main
