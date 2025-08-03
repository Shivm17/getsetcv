import mongoose from "mongoose";

const contactusSchema = new mongoose.Schema({
  name : {
    type : String,
    require: true
  },
  surname : {
    type : String,
    require: true
  },
  email : {
    type : String,
    require: true
  },
  description : {
    type : String,
    require: true
  },
}) 

export const ContactUs = mongoose.model.ContactUs || mongoose.model("ContactUs", contactusSchema);