import Product from "../models/productmodel.js";

import {rm} from 'fs'

export const createProduct  = async(req , res)=>{
    try {


if(req.user.role !== 'admin'){
    return res.status(403).json({
        message: 'Unauthorized'
    })
}


        const {title , description ,stock ,category ,price} = req.body

        const image = req.file

        if(!image){
            return res.status(500).json({
                message: 'image required'
            })
        }

        const product = await Product.create({
            title , description ,stock ,category ,price , image: image?.path
        })

        res.status(201).json({
            message: " product created ",
            product
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


export const fetchProduct = async(req , res)=>{
    try {

        const {search , category , price , page} = req.query ;
const filter = {}

if(search){
    filter.title={
        $regex : search , 
        $options : 'i'
    }
}

if(price){
    filter.price={
        $gte: Number(price)
    }
}

if(category) filter.category = category ;

const countProduct = await Product.countDocuments() ;

const limit = 4 ;
const skip = (page-1)* limit ;


const totalPages = Math.ceil(countProduct/limit)



        const products = await Product.find(filter).sort('-createdAt').limit(limit).skip(skip);

const categories = await Product.distinct("category")

const mostSelling = await Product.find().sort({sold: -1}).limit(3) ;



        res.json({
            products , categories , mostSelling , totalPages,
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const fetchAdminProduct = async(req, res)=>{
    try {
        const product = await Product.find()

        res.json({
            product
        })
        
    } catch (error) {
        res.status(500).json({
            mmessage: error.message
        })
        
    }

}

export const fetchSingleProduct = async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id)

        res.json({
            product
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const udateStock= async(req, res)=>{
    try {

        if(req.user.role !=="admin"){
            return res.status(403).json({
                message: "unauthorized user"
            })
        }

        const product = await Product.findById(req.params.id)

        if(req.body.stock){
            product.stock = req.body.stock ;
           await product.save()
          return res.status(201).json({
            message:"stock updated"
           })
        }

        res.status(500).json({
            message: "please give stock value "
        })
      
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


export const deleteProduct =async(req, res)=>{
    try {
        if(req.user.role !== "admin"){
         return   res.status(500).json({
                message: " Unauthorised "
            })
        }
const product = await Product.findById(req.params.id) ;

rm(product.image, ()=>{
    console.log("image deleted")

})

await product.deleteOne();

res.status(200).json({
    message: "product deleted"
})

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}