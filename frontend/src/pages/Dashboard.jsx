import React from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="flex ">
      <AdminSidebar/>
      <div className="flex-1">
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard