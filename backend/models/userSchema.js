import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ 

  name: {
    type: String,
    required: true,
  },
  email:  {
    type: String,
    required: true, 
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
}, {
   timestamps : true // Automatically manage createdAt and updatedAt fields
}
)

export const User = mongoose.models.User || mongoose.model("User", userSchema);