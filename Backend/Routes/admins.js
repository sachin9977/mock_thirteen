import express from "express"
import { addjob, deleteJob, editJob, getJobs, login, register } from "../Controllers/Admin.js"

const router = express.Router()


router.post("/signup",register)

router.post("/login",login)

router.post("/addjob",addjob)

router.get('/jobs',getJobs)

router.delete("/deleteJob/:id",deleteJob)

router.patch('/editJob/:id',editJob)

export default router




