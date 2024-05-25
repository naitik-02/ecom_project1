import mongoose from "mongoose";
import User from "./usermodel.js";

const schema = new mongoose.Schema({
    address:{
        type:String,
        required: true
    },
    phone:{
            type: Number,
            required:true 
    },
    user:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:"User",
        required:true
    }
})

const Address = mongoose.model("Address", schema);

export default Address