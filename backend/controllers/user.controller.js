import Users from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SendEmail from "../utils/sendEmail.js";



export const registerUser = async (req , res){
    try{
        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await Users.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

       //send email verification code
       const verificationCode = Math.floor(100000 + Math.random() * 900000);
       await Users.updateOne({ email }, { verificationCode });
       await SendEmail(email, "Your Chatter Verification Code", `Your verification code is: ${verificationCode} . It will expire in 15 minutes.`);   


        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ name, email, password: hashedPassword });
        await newUser.save();

        // create JWT token
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//verify user

export const verifyUser = async (req , res){
    try{
        const { email, verificationCode } = req.body;

        // find user by email
        const user = await Users.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        // check verification code
        if(user.verificationCode !== parseInt(verificationCode)){
            return res.status(400).json({ message: "Invalid verification code" });
        }

        // Update user to mark email as verified
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const loginUser = async (req , res){
    try{
        const { email, password } = req.body;

        // check if user exists
        const user = await Users.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "User logged in successfully", token , user});
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
