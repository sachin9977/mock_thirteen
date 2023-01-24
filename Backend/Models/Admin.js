import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    name:String,
    email :{type:String,require:true,unique:true,max:40},
    password :{type:String,require:true,min:5},
},{
    timestamps:true
})

const Admin = mongoose.model("Admin",adminSchema)

export default Admin