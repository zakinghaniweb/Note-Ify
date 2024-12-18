import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const LayoutOne = () => {
  const currentUser = useSelector((state)=>state.User.value)
  const navigate = useNavigate()
  useEffect(()=>{
    if (currentUser == null) {
      navigate("/login")
    }
  },[])
  return (
    <div>
        <Navbar></Navbar>
        <div className="flex">
        <Sidebar></Sidebar>
        <Outlet></Outlet>
        </div>
    </div>
  )
}

export default LayoutOne