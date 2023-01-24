import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./Routes/users.js"
import adminRoutes from "./Routes/admins.js"

const app=express()
app.use(cors())
app.use(express.json())
dotenv.config()


app.use("/user",userRoutes)
app.use("/admin",adminRoutes)



const PORT = process.env.PORT || 3001
let connections = mongoose.connect(process.env.MONGO_URL)

app.listen(PORT,async()=>{
    try{
        await connections
        console.log("Server Connected")
    }
    catch(err){
        console.log("Something went wrong",err)
    }
})