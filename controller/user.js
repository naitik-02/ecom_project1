import sendMail from "../middlewares/sendmail.js";
import User from "../models/usermodel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

 
 export const UserRegister =async(req , res)=>{

    try {
        const {username , email , password} = req.body
        
let user = await User.findOne({email})

if(user){
    return res.status(402).json({
        message: "user already exist"
    })
}
const hashedPassword =  await bcrypt.hash(password , 10)


user = ({
    username , email , password: hashedPassword
})

const otp = Math.floor( Math.random() *100000);

const activationToken =  jwt.sign({user , otp} , process.env.jwt_secret,{
    expiresIn: '5m'
})


await sendMail(
    email , 
    'lets Negotitate',
    `please verify your account with otp: ${otp}`
)

res.status(200).json({
  message : "otp is send to your email ",
  activationToken,
 
})

    } catch (error) {
        res.status(500).json({
            message: error
        })
    }

 } 

 export const verifyUser = async (req, res) => {
  try {
      const { otp, activationToken } = req.body;

      

      const verify = jwt.verify(activationToken, process.env.jwt_secret);
      

      if (!verify)
          return res.status(400).json({
              message: "Otp expired",
          });

      if (verify.otp !== otp)
          return res.status(400).json({
              message: "Wrong Otp",
          });

      await User.create({
          username: verify.user.username,
          email: verify.user.email,
          password: verify.user.password,
      });

      res.json({
          message: "User Registered",
      });
  } catch (error) {
      console.error("Verification Error:", error);
      res.status(500).json({
          message: error.message,
      });
  }
};


export const LoginUser = async (req , res )=>{
    try {
    const {email , password} = req.body 

    const user = await User.findOne({email})

    if(!user){
        return  res.status(403).json({
            message : "invalid credentials" ,

        })
    }

    const  verifypassword =  await bcrypt.compare(password , user.password)

    if(!verifypassword){
       return res.status(403).json({
            message:"invalid credientials"
        })
    }

    const token =  jwt.sign({_id : user._id} ,process.env.jwt_secret ,{
        expiresIn: "15d"
    })

    res.status(200).json({
        message:`Welcome back ${user.username}`,
        token,user
    })


        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const myProfile  = async (req, res)=>{
    try {
       const user = await User.findById(req.user._id) 

       res.json({
        user
       })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
