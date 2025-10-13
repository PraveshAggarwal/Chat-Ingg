import User from "../src/models/user.model.js";
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
     
        const newUser = new User.create({
            fullname,
            email,
            password,
            profilePic: randomAvatar,
        });

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie("jwt", token, {
            httpOnly: true, // prevents XSS attacks
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // prevent CSRF attack
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(201).json({success:true, user:newUser})
    
    }catch(error){
        console.log(error);
    }
}

export async function login(req, res){
res.send("Login Route");
};


export function logout(req, res){
    res.send("Logout Route");
    };