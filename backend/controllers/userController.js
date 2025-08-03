// Description: Controller for handling user-related operations
import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ContactUs } from "../models/contactUs.js";

//generate token for user
const generatorToken = (userId) => { 
  return jwt.sign({userId}, process.env.JWT_SECRET,{ expiresIn: "1d" })
}

export const registerUser = async (req, res) => { 
  try {
    //get the name email and password
    const { name , email , password } = req.body;

    //check all the fiels 
    if(!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields"
      });
    }

    //check if user already exists or not 
    const existingUser = await User.find({email})

    if(existingUser.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists" 
      });
    }
     
    //validate password
    if(password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      })
    }

    //generate the salt
     const saltedPassword = await bcrypt.genSalt(10); 
     
    //hash the password 
     const hashedPassword = await bcrypt.hash(password, saltedPassword);
   
    //create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if(user){
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generatorToken(user._id)
        }
      });
    }else{
      return res.status(400).json({
        success: false,
        message: "User registration failed"
      });
    }
    
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error"  , error: error.message });  
  }
}


export const loginUser = async (req, res) => { 
  try{

    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields"
      });
    }

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      })
    }

    //compare the passsword 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if(!isPasswordValid) { 
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }else{
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generatorToken(user._id)
        }
      });
    }

  }catch(error) {
    return res.status(500).json({ success: false, message: "Internal server error"  , error: error.message });
  }
}

//get user details
export const getUserDetails = async (req, res) => { 
  try {
    const userId = req.user._id; // Assuming you have middleware to set req.user
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required or not found"
      });
    }
    const user = await User.findById(userId).select("-password"); // Exclude password from response

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
}

export const contactUs = async (req,res) => {
   try {
     const {name,email,surname ,description } = req.body;

     if(!name || !email || !surname || !description) {
      return res.status(400).json({
        success:false,
        message:"Please Field All the field"
      })
     }
     
     const response = await ContactUs.create({
      name,
      email,
      surname,
      description
     })
     console.log(response);
     if(!response){
      return res.status(400).json(({
        success:false,
        message:"Something Went Wrong"
      }))
     }else{
      return res.status(201).json({
        success:true,
        message:"Request Sent Succesfully",
        data:response
      })
     }
     
   } 
   catch(error) {
    return res.status(500).json({ success: false, message: "Internal server error"  , error: error.message });
  }
} 