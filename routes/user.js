import express from 'express'
import { createUser,loginUser } from '../controllers/user.js';
import { authMiddleware } from '../middlewares/auth.js';
const router= express.Router()



// routes

router.get('/home',authMiddleware,(req,res)=>{
    res.render('home.ejs')
})

router.get('/dashboard',authMiddleware,(req,res)=>{
    res.render('dashboard.ejs');
})

router.post('/signup',createUser);
router.post('/login',loginUser);

export default router