import Address from "../models/addressmodel.js";


export const AddAdress=async(req , res)=>{

    try {

        const {address , phone} = req.body ;

        await Address.create({
            address , phone , 
            user:req.user._id
        })

        res.status(200).json({
            message:"Address saved"
        })

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }

}

export const FetchAllAddress = async(req ,res)=>{
    try {
        const alladdress = await Address.find({user : req.user._id})

        res.status(200).json({
            alladdress
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })  
    }
}

export const fetchOneAddress = async(req , res)=>{
    try {
        const address = await Address.findById(req.params.id);

        res.json({
            address
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })  
    }
}

export const deleteAdress = async(req , res)=>{
    try {
        const address = await Address.findOne({
            _id: req.params.id ,
            user: req.user._id
        })
        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        await address.deleteOne();

        res.json({
            message:"adress deleted"
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })  
    }
}