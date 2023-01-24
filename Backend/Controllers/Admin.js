import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import Admin from '../Models/Admin.js';
import Job from '../Models/Job.js';

export const register = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password,salt)
        const newAdmin = new Admin({
            name,
            email,
            password:passwordHash,
        })
        const saveAdmin = await newAdmin.save()
        res.status(201).send({"msg":"Admin Saved Successfully",saveAdmin})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:err.message})
    }
}


export const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await Admin.findOne({email:email})
        if(!user) return res.status(400).json({msg:"User not exist"})

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:"wrong details"})

        const token= jwt.sign({id:user._id},process.env.JWT_KEY)
        delete user.password;
        res.status(200).json({token,user})

    }catch(err){
        console.log(err)
    }
}

export const addjob=async(req,res)=>{
    try{
        const {name,position,contact,location} = req.body;
        const newJob = new Job({
            name,
            position,
            contact,
            location
        })
        const saveJob = await newJob.save()
        res.status(201).json({"msg":"User Saved Successfully",saveJob})

    }catch(err){
        console.log(err)
    }
}

export const getJobs=async(req,res)=>{
    try{
        const jobs =await Job.find()
        res.status(200).send(jobs)
    }catch(err){
        console.log(err)
    }
}


export const deleteJob=async(req,res)=>{
    try{
        const {id}=req.params
        await Job.findByIdAndDelete({_id:id})
        const jobs=await Job.find()
        res.status(200).send({"msg":"Job Deleted",jobs})
    }catch(err){
        console.log(err)
    }
}

export const editJob=async(req,res)=>{
    try{
        const {id}=req.params
        const {newName,position,contact,location}=req.body
        const edit=await Job.findByIdAndUpdate({_id:id},{
            name:newName,
            position,
            contact,
            location
        })
        const jobs=await Job.find()
        res.status(200).send(jobs)
    }catch(err){
        console.log(err)
    }
}