import jwt from "jsonwebtoken"
// import dotenv from 'dotenv'
// dotenv.config() 

const adminAuth = async (req,res,next) => {
    try {
        
    let {token} = req.cookies

    if(!token){
        return res.status(400).json({message:"Not Authorized Login Again"})
    }
    
    let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

    if (!verifyToken) {
        return res.status(400).json({ message: "Not Authorized Login Again ,Invalid token"})
    }

    req.adminEmail = process.env.ADMIN_EMAIL
    next()
    } catch (error) {
        console.error("admiAuth error", error)
        return res.status(500).json({ message: `adminAuth Error: ${error.message}` })
    }
}


export default adminAuth