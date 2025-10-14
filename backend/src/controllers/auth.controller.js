import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res){
    const {email,password,fullname} = req.body;
    try{
        if(!email || !password || !fullname){
            return res.status(400).json({message:"Please fill all the fields"});
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        
        // to check the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already exists, please use a different"});
        }
        
        // generate a random profile pic from randomuser.me
        const idx = Math.floor(Math.random() * 100) + 1; // random number between 1 to 100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
     
        const newUser = await User.create({
            fullname,
            email,
            password,
            profilePic: randomAvatar,
        });
 
        // create the user in stream as well


        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
        res.cookie("jwt", token, {
            httpOnly: true, // prevents XSS attacks
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // prevent CSRF attack
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(201).json({success:true, user:newUser})
    
    }catch(error){
        console.log("Error in signup controller" ,error);
        res.status(500).json({message: "Server Error"});
    }
}



export async function login(req, res){
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({message: "Invalid email or password"});
        
        const isPasswordCorrect = await user.matchPassword(password);
        if(!isPasswordCorrect) return res.status(401).json({message: "Invalid email or password"});
          
    } catch(error){
        console.log("Error in login controller", error);
        res.status(500).json({message: "Server Error"});
    }
};


export function logout(req, res){
    res.send("Logout Route");
    };