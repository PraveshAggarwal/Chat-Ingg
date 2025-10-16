import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const protectRoute = async (req , res , next) => {

    try{
        const token = req.cookies.jwt;  // to get the token from cookie

        if(!token){
            return res.status(401).json({message: "Unauthorized - No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); // in token we have an id in payload, - is to remove the password

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user; 
        next();
        
    }catch(error){
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({message: "Server Error"});
    }
}