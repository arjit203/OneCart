import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'

function Nav() {
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(adminDataContext)
    const [loading,setLoading] = useState(false)
    const LogOut = async () => {
        try {
            const result = await axios.get(serverUrl + '/api/auth/logout',{withCredentials:true})
            getAdmin()
            navigate("/login")
            toast.success("AdminLogout Successfully")
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.success("AdminLogout Failed")
            setLoading(false)
        }
        
    }
  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black'>
        <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={()=>navigate("/")}>
            <img src={logo} alt=""className='w-[30px]'/>
            <h1 className='text-[25px] text-black font-sans'>OneCart</h1>
        </div>
        <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white ' onClick={LogOut}>LogOut</button>
      
    </div>
  )
}

export default Nav
