import React from 'react'
import SellerSidebar from '../components/seller/SellerSidebar'
import { Outlet } from 'react-router-dom'

const SellerDashboardLayout = () => {
  return (
    <div className='flex'>
        <div className='fixed'>

        <SellerSidebar/>
        </div>
        <div className='flex-1 sm:ml-0 md:ml-64 lg:ml-64 xl:ml-64 2xl:ml-64'>
        <Outlet />
        </div>
    </div>
  )
}

export default SellerDashboardLayout