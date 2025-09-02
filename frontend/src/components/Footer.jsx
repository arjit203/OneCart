import React from 'react'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <div className="w-full mb-[77px] md:mb-0 bg-[#dbfcfcec]">
      <div className="w-full flex flex-col md:flex-row md:justify-between items-center md:items-start px-4 md:px-[50px] py-6 gap-6 flex-wrap">

        <div className="flex-1 min-w-[250px] flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]" />
            <p className="text-[19px] md:text-[20px] font-semibold text-black">OneCart</p>
          </div>
          <p className="text-[15px] text-[#1e2223] hidden md:block">
            OneCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery — all backed by trusted service designed to make your life easier every day.
          </p>
          <p className="text-[15px] text-[#1e2223] md:hidden">
            Fast. Easy. Reliable. OneCart Shopping
          </p>
        </div>

        <div className="flex-1 min-w-[200px] flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-[19px] md:text-[20px] font-sans mb-2">COMPANY</p>
          <ul className="flex flex-col gap-1">
            <li className="text-[15px] text-[#1e2223] cursor-pointer">Home</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">About Us</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">Delivery</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div className="flex-1 min-w-[200px] flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-[19px] md:text-[20px] font-sans mb-2">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1">
            <li className="text-[15px] text-[#1e2223] cursor-pointer">+91-9876543210</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">contact@onecart.com</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">+1-123-456-7890</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">admin@onecart.com</li>
          </ul>
        </div>
      </div>

      <div className="w-full h-[1px] bg-slate-400"></div>

      <div className="w-full py-3 flex items-center justify-center text-center text-sm">
        Copyright 2025 @onecart.com — All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer
