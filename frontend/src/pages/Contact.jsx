import React from 'react'
import Title from '../components/Title'
import contact from '../assets/contact.webp'
import NewLetterBox from '../components/NewLetterBox'

function Contact() {
  return (
    <div className='w-full min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] overflow-x-hidden'>
      <Title text1={"CONTACT"} text2={"US"}/>
    
        <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
          <div className='w-[100%] flex items-center justify-center flex-col lg:w-[50%]'>
          <img src={contact} className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm ' alt="" />
          </div>

          <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
            <p className='lg:w-[80%] w-[100%] text-white lg:text-[18px] text-[15px] font-bold
            '>Our Store</p>

            <p className='lg:w-[80%] w-[100%] text-white lg:text-[18px] text-[13px]  md:text-[16px]'>
            <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
              12345 Random Statiom
            </p>
            <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
              random city , state , India
            </p>
            </p>

            <p className='lg:w-[80%] w-[100%] text-white lg:text-[18px] text-[13px]  md:text-[16px]'>
            <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
              tel: +91-9876543210
            </p>
            <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>Email: admin@onecart.com
            </p>
            </p>

            <p className='lg:w-[80%] w-[100%] text-white lg:text-[18px] text-[15px] font-bold
            mt-[10px] '>Careers at OneCart</p>

            <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>Learn more about our teams and job openings.
            </p>

            <button className='px-[30px] py-[20px] flex items-center justify-center text-white bg-transparent border active:bg-slate-600 rounded-md cursor-pointer'>
            Explore Jobs
            </button> 
          </div>
        </div>
        <NewLetterBox/>

      
    </div>
  )
}

export default Contact
