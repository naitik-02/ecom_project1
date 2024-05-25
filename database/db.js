import mongoose from "mongoose";




export const connectDatabase =async()=>{
  try {
    await mongoose.connect(process.env.URL)
    console.log("Database Connected")
  } catch (error) {
    console.log(error) 
  }

}