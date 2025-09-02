import Order from "../model/orderModel.js"
import User from "../model/UserModel.js"




// For User :

export const placeOrder = async (req, res) => {
    try {
        const {items, amount, address} = req.body
        const userId = req.userId
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()
        await User.findByIdAndUpdate(userId,{cartData:{}})
        return res.status(201).json({message:"Order Placed"})
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Order Place Error"})
        
    }
}


export const userOrders = async (req, res) => {
    try {
        const userId = req.userId
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"userOrders Error"})
        
    }
}
    



// For Admin : 

export const allOrders = async (req,res) => {

    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"adminAllOrders Error"})
    }
    
}

export const updateStatus = async (req,res) => {
    try {
        const {orderId, status} = req.body

        await Order.findByIdAndUpdate(orderId, {status})
        return res.status(200).json({message:"Status Updated"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
        
    }
    
}
