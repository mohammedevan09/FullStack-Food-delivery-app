import React, { useState } from 'react'
import DashBLeftSection from '../components/DashBLeftSection'
import DashBRightSection from '../components/DashBRightSection'
import Footer from '../components/Footer'

const Dashboard = () => {
  const [showNav, setShowNav] = useState(false)
  return (
    <>
      <div className="w-screen h-screen flex items-center bg-gray-900">
        <DashBLeftSection showNav={showNav} setShowNav={setShowNav} />
        <DashBRightSection showNav={showNav} setShowNav={setShowNav} />
      </div>
      <Footer />
    </>
  )
}

export default Dashboard
