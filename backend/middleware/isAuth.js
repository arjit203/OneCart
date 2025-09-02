import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config() 

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies

        if (!token) {
            return res.status(400).json({ message: "User doesn't have a token" })
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(400).json({ message: "User doesn't have a valid token" })
        }

        req.userId = verifyToken.userId
        next()
    } catch (error) {
        console.error("isAuth error", error)
        return res.status(500).json({ message: `isAuth Error: ${error.message}` })
    }
}

export default isAuth
