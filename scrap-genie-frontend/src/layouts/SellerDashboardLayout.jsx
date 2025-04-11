import React from 'react'
import SellerSidebar from '../components/seller/SellerSidebar'
import { Outlet } from 'react-router-dom'

const SellerDashboardLayout = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
        <div className='fixed inset-y-0 z-10'>
            <SellerSidebar/>
        </div>
        <div className='flex-1 transition-all duration-300 sm:ml-0 md:ml-64 lg:ml-64 xl:ml-64 2xl:ml-64'>
            <main className=''>
                <div className='rounded-xl bg-white p-6 shadow-sm'>
                    <Outlet />
                </div>
            </main>
        </div>
    </div>
  )
}

export default SellerDashboardLayout