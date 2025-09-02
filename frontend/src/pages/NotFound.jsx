import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    let navigate = useNavigate()
  return (
    <div className='w-[100vw] lg:h-[100vh]  bg-gradient-to-l flex from-[#141414] to-[#0c2025] md:text-[70px] text-[30px] items-center justify-center flex-col text-white gap-[20px]'>
        404 Page Not Found
        <button className='bg-white px-[20px] py-[10px] cursor-pointer rounded-xl text-[18px] text-black' onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}

export default NotFound
