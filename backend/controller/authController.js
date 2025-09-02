import User from "../model/UserModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js"


export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter Valid Email" });
        }

        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Enter Strong Password" });
        }

        let hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashPassword });

        let token = await genToken(user._id);   

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json(user);

    } catch (error) {
        console.error("registration error", error);
        return res.status(500).json({ message: `registration Error: ${error.message}` });
    }
}



export const login= async (req,res)=>{
    try {
        let {email,password}= req.body

        let user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User Not Found"})
        }

        let isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({message:"Incorrect Password"})
        }

        let token= await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)

    } catch (error) {
        console.error("Login error", error);
        return res.status(500).json({ message: `Login Error: ${error.message}` });
    }
}

export const logout= async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(201).json({message:"LogOut sucessfully"})

    } catch (error) {
        console.error("LogOut error", error);
        return res.status(500).json({ message: `LogOut Error: ${error.message}` });
        
    }
}


export const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email
            });
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json(user);

    } catch (error) {
        console.error("googleLogin error", error);
        return res.status(500).json({ message: `googleLogin Error: ${error.message}` });
    }
}




export const adminLogin = async (req,res) => {
    try {
        let {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

        let token = await genToken1(email)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(token)
        }
        return res.status(400).json({message:"Invalid Credentials"})

    } catch (error) {
        console.error("adminLogin error", error)
        return res.status(500).json({ message: `adminLogin Error: ${error.message}` })
        
    }
}
