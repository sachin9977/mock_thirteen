import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:String,
    email :{type:String,require:true,unique:true,max:40},
    password :{type:String,require:true,min:5},
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema)

export default User 