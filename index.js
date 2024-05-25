import express from "express"
import dotenv from "dotenv"
import { connectDatabase } from "./database/db.js"
import userrouter from "./routes/userRoutes.js"
import productrouter from "./routes/productRoutes.js"
import cartrouter from "./routes/cartRoutes.js"
import addressrouter from './routes/addressroute.js'
import orderrouter  from "./routes/orderroutes.js"
import cors from 'cors'



// middleware---------

const app = express() 

dotenv.config()
app.use(cors())

const Port = process.env.port || 5000 

app.use(express.json())

app.use('/api' , userrouter)
app.use('/api' , productrouter)
app.use('/uploads' , express.static("uploads") )
app.use('/api' , cartrouter)
app.use('/api',addressrouter)
app.use('/api',orderrouter)


app.listen(Port ,()=>{
    console.log(`server is running on http://localhost:${Port}`)
    connectDatabase()
})