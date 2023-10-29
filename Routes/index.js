// To decide the path of the request
import dotenv from 'dotenv'
import express from 'express'
import question from './question.js'
import option from './options.js'
import user from './user.js'

dotenv.config()
const router = express.Router()

router.use('/questions', question)
router.use('/options', option)
router.use('/user', user)
router.get('/login', (req, res) => {
    res.json({message:"Kindly resend your login request"})
})
router.use('/', (req, res) => {
    res.status(200).json({success:true, message:"Welcome home"})
})
export default router