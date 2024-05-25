import mongoose from "mongoose";



const schema = mongoose.Schema({
    quantity:{
        type: Number ,
        required : true
    },

    product:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:"Product" 
    } ,

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Cart = mongoose.model("Cart" , schema)

export default  Cart