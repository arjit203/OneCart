import React from 'react'
import Title from '../components/Title'
import { useContext, useState, useEffect } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBinLine } from "react-icons/ri"
import CartTotal from '../components/CartTotal'
import { toast } from "react-toastify"

function Cart() {

  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = []
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item]
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
        {cartData.map((item, index) => {
          const productData = products.find((product) =>
            product._id === item._id)
          if (!productData) return null

          return (
            <div key={index} className='w-[100%] h-[10%] border-t border-b'>
              <div className='w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[10px] rounded-2xl relative flex-wrap sm:flex-nowrap'>
                <img src={productData.image1} className='w-[100px] h-[100px] rounded-md ' alt="" />

                <div className='flex items-start justify-center flex-col gap-[10px]'>
                  <p className='md:text-[25px] text-[20px] text-[#f3f9fc]'>{productData.name}</p>
                  <div>
                    <div className='flex items-center gap-[20px]'>
                      <p className='text-[20px] text-[#aaf4e7]'>{currency} {productData.price}</p>
                      <p className='w-[40px] h-[40px] text-[16px] text-white bg-[#518080b4] rounded-md mt-[5px] flex items-center justify-center border-[1px] border-[#9ff9f9]'>{item.size}</p>
                    </div>
                  </div>
                </div>

        \
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className='
                    md:max-w-20 md:px-2 md:py-2 
                    py-[5px] px-[10px] text-white text-[18px] font-semibold 
                    bg-[#518080b4] border-[1px] outline-0 border-[#9ff9f9] rounded-md cursor-pointer
                    static mt-2 sm:mt-0 sm:absolute sm:top-[46%] sm:left-[75%] md:top-[40%] md:left-[50%] sm:w-[70px]  w-[55px]
                  '
                  onChange={(e) =>
                    e.target.value === ' ' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                />

                
                <RiDeleteBinLine
                  className='
                    text-[#9ff9f9] w-[25px] h-[25px] cursor-pointer
                    static mt-2 sm:mt-0 sm:absolute sm:top-[50%] sm:right-1 md:top-[40%] md:right-[5%]
                  '
                  onClick={() => {updateQuantity(item._id, item.size, 0)
                     toast.info("Item removed from cart")}
                  }
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className='flex items-end justify-start my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <button
            className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder")
              }
              else {
                console.log("Your Cart Is Empty")
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

    </div>
  )
}

export default Cart
