import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

function PlaceOrder() {
  let [method, setMethod] = useState('cod')
  const {cartItem, setCartItem, getCartAmount, delivery_fee, products} = useContext(shopDataContext)
  let {serverUrl} = useContext(authDataContext)
  let navigate = useNavigate()
  let [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pinCode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({...data,[name]:value}))
  }


  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    try {
        let orderItems = []
        for(const items in cartItem){
            for(const item in cartItem[items]){
                if(cartItem[items][item] > 0 ){
                    const itemInfo = structuredClone(products.find(product => product._id === items))
                    if(itemInfo){
                        itemInfo.size = item
                        itemInfo.quantity = cartItem[items][item]
                        orderItems.push(itemInfo)                   
                    }
                }
            }
        }
        let orderData = {
            address:formData,
            items:orderItems,
            amount:getCartAmount() + delivery_fee
        }
        switch(method) {
            case 'cod' :
                const result = await axios.post(serverUrl + '/api/order/placeorder',orderData,{withCredentials:true})
                console.log(result.data)
                if(result.data){
                    setCartItem({})
                    navigate("/order")
                    toast.success("PlaceOrder Successfully")
                }
                else{
                    console.log(result.data.message)
                    toast.success("PlaceOrder Successfully")
                }
                break
            default : 
                break  

        }
    } catch (error) {
        console.log(error)
        toast.success("PlaceOrder Failed")
        
    }

  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-center justify-center gap-[50px] relative'>

      <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-0 mt-[90px]'>
        <form className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]' onSubmit={onSubmitHandler}>

          <div className='py-[10px]'>
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className='w-full h-[70px] flex justify-between px-[10px]'>
            <input type="text" className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] outline-0' required placeholder='First Name'  onChange={onChangeHandler} name='firstName' value={formData.firstName}/>
            <input type="text" className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] outline-0' required placeholder='Last Name' onChange={onChangeHandler} name='lastName' value={formData.lastName} />
          </div>

          <div className='w-full h-[70px] flex px-[10px]'>
            <input type="email" className='w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] outline-0' required placeholder='Email Address' onChange={onChangeHandler} name='email' value={formData.email}/>
          </div>

          <div className='w-full h-[70px] flex px-[10px]'>
            <input type="text" className='w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] outline-0' required placeholder='Street' onChange={onChangeHandler} name='street' value={formData.street} />
          </div>

          <div className='w-full h-[70px] flex justify-between px-[10px]'>
            <input type="text" className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] outline-0' required placeholder='City'  onChange={onChangeHandler} name='city' value={formData.city}/>
            <input type="text" className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] outline-0' required placeholder='State' onChange={onChangeHandler} name='state' value={formData.state} />
          </div>

          <div className='w-full h-[70px] flex justify-between px-[10px]'>
            <input type="number" className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] outline-0' required placeholder='PinCode' onChange={onChangeHandler} name='pinCode' value={formData.pinCode}/>
            <input type="text" className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] outline-0' required placeholder='Country' onChange={onChangeHandler} name='country' value={formData.country} />
          </div>

          <div className='w-full h-[70px] flex px-[10px]'>
            <input type="number" className='w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] outline-0' required placeholder='Phone' onChange={onChangeHandler} name='phone' value={formData.phone} />
          </div>

          <div className='hidden lg:flex justify-end px-[10px] mt-[20px]'>
            <button type='submit' className='text-[18px] active:bg-slate-500 bg-[#3bcee848] py-[10px] px-[30px] cursor-pointer  rounded-2xl text-white border border-[#80808049]' onClick={onSubmitHandler}>
              PLACE ORDER
            </button>
          </div>

        </form>
      </div>

      <div className='lg:w-[50%] w-[100%] flex items-center justify-center gap-[30px]'>
        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex flex-col items-center justify-center gap-[10px]'>
          <CartTotal />

            <Title text1={"PAYMENT"} text2={"METHOD"} />
    <div className='w-[100%] h-[10vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]'>

            <button className={`w-[150px] h-[50px] rounded-sm cursor-pointer ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm' : '' }`} onClick={()=>setMethod('razorpay')}>
                <img src={razorpay} alt="" className='w-[100%] h-[100%] object-fill rounded-sm' />
            </button>

        <button className={`w-[200px] h-[50px] rounded-sm bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] font-bold cursor-pointer ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm' : '' }`} onClick={()=>setMethod('cod')}>CASH ON DELIVERY</button>
        </div>

       <div className='flex lg:hidden justify-center px-[10px] mt-[20px] w-full'>
            <button type='submit' className='text-[18px] active:bg-slate-500 bg-[#3bcee848] py-[10px] px-[30px] rounded-2xl mb-[12vh] text-white border border-[#80808049] w-full cursor-pointer ' onClick={onSubmitHandler}>
              PLACE ORDER
            </button>
          </div>


        </div>
      </div> 
    </div>
  )
}

export default PlaceOrder
