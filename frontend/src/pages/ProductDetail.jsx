import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../components/RelatedProduct'
import { toast } from 'react-toastify'

function ProductDetail() {
    let {productId} = useParams()
    let {products, currency, addToCart} = useContext(shopDataContext)
    let [productData, setProductData] = useState(false)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')

    const fetchProductData = async () => {
        products.forEach((item) =>{
            if (item._id === productId){
                setProductData(item)
                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                setImage4(item.image4)
                setImage(item.image1)
            }
        })  
    }

    useEffect(()=>{
        fetchProductData()
    },[productId,products])

  return  productData ? (
    <div>
    <div className='lg:w-[99vw] w-[100vw] min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-center justify-start gap-[20px] px-2 sm:px-4'>

     
        <div className='lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-auto mt-[40px] flex flex-col-reverse lg:flex-row items-center justify-center md:gap-[10px] gap-[20px]'>

       
            <div className='lg:w-[20%] md:w-[80%] flex lg:flex-col flex-wrap items-center justify-center gap-[10px]'>
                {[image1,image2,image3,image4].map((img,idx)=>(
                    <div key={idx} className='md:w-[100px] w-[60px] h-[60px] md:h-[110px] bg-slate-300 border border-[#80808049] rounded-md'>
                        <img src={img} alt="" className='h-full w-full cursor-pointer rounded-md' onClick={()=>setImage(img)} />
                    </div>
                ))}
            </div>

    
            <div className='lg:w-[60%] w-[80%] border border-[#80808049] rounded-md overflow-hidden'>
                <img src={image} alt="" className='w-full h-full object-fill' />
            </div>
        </div>

  
         <div className='lg:w-[50vw] w-[100vw] lg:h-[75vh] h-auto lg:mt-[80px] flex flex-col gap-[10px] py-[20px] px-[15px]'>
            <h1 className='text-[28px] sm:text-[35px] md:text-[40px] font-semibold text-[aliceblue]'>{productData.name.toUpperCase()}</h1>
            
            <div className='flex items-center gap-1'>
                <FaStar className='text-[18px] sm:text-[20px] fill-[#FFD700]' />
                <FaStar className='text-[18px] sm:text-[20px] fill-[#FFD700]' />
                <FaStar className='text-[18px] sm:text-[20px] fill-[#FFD700]' />
                <FaStarHalfAlt className='text-[18px] sm:text-[20px] fill-[#FFD700]' />
                <FaStarHalfAlt className='text-[18px] sm:text-[20px] fill-[#FFD700]' />
                <p className='text-[14px] sm:text-[16px] md:text-[18px] font-semibold pl-[5px] text-white'>(124)</p>
            </div>

            <p className='text-[22px] sm:text-[26px] md:text-[30px] font-semibold pl-[5px] text-white'>
                {currency} {productData.price}
            </p>

            <p className='w-[90%] md:w-[70%] text-[14px] sm:text-[16px] md:text-[20px] font-semibold pl-[5px] text-white'>
                {productData.description} and Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style.
            </p>

  
            <div className='flex flex-col gap-[10px] my-[10px]'>
                <p className='text-[18px] sm:text-[22px] md:text-[25px] font-semibold pl-[5px] text-white'>Select Size</p>
                <div className='flex gap-2 flex-wrap'>
                    {productData.sizes.map((item,index)=>(
                        <button 
                            key={index} 
                            className={`border py-1 px-3 sm:py-2 sm:px-4 bg-slate-300 rounded-md cursor-pointer ${item === size ? 'bg-black text-[#2f97f1] text-[16px] sm:text-[20px]' : ''}`} 
                            onClick={()=>setSize(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <button className='text-[14px] sm:text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[8px] sm:py-[10px] px-[15px] sm:px-[20px] rounded-2xl mt-[10px] border border-[#80808049] text-white shadow-md shadow-black' onClick={()=>{if(!size){
                    toast.error("Please select a size")  
                    return
                }
                   addToCart(productData._id,size)
                   toast.success("Item Added Successfully")}}>
                    Add To Cart
                </button>
            </div>

            <div className='w-[90%] h-[1px] bg-slate-700'></div>

            <div className='w-[90%] text-[12px] sm:text-[14px] md:text-[16px] text-white'>
                <p>100% Original Product.</p>
                <p>Cash on delivery is available on this product</p>
                <p>Easy return and exchange policy within 7 days</p>
            </div>
         </div>
    </div>


    <div className='w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col overflow-x-hidden'>
        <div className='flex flex-wrap px-[10px] sm:px-[20px] mt-[40px] lg:ml-[80px]'>
            <p className='border px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm text-white'>Description</p>
            <p className='border px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm text-white'>Reviews (124)</p>
        </div>

        <div className='w-[90%] md:h-[150px] h-auto bg-[#3336397c] border text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px] mt-4'>
            <p className='flex items-center justify-center w-full h-full text-center'>
                Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
            </p>
        </div>

        <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
    </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default ProductDetail
