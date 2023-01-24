import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    name:String,
    position:String,
    contact:String,
    location:String
},{
    timestamps:true
})

const Job = mongoose.model("Job",jobSchema)

export default Job