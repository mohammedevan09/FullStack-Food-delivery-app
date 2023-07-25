import React from 'react'
import DashHeader from './DashHeader'
import DashHome from './DashHome'
import DashOrders from './DashOrders'
import DashItems from './DashItems'
import DashNewItems from './DashNewItems'
import DashUsers from './DashUsers'
import { Route, Routes } from 'react-router-dom'

const DashBRightSection = ({ showNav, setShowNav }) => {
  return (
    <div className="flex flex-col md:py-12 py-3 md:px-12 px-3 flex-1 h-full text-white bg-gray-900">
      <DashHeader showNav={showNav} setShowNav={setShowNav} />
      <div className="flex flex-col overflow-y-scroll scrollbar-none flex-1 text-white items-center justify-center">
        <Routes>
          <Route path="/*" element={<DashHome />} />
          <Route path="/orders/*" element={<DashOrders />} />
          <Route path="/items" element={<DashItems />} />
          <Route path="/newItem" element={<DashNewItems />} />
          <Route path="/users" element={<DashUsers />} />
        </Routes>
      </div>
    </div>
  )
}

export default DashBRightSection
