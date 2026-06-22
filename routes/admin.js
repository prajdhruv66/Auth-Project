import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import { deleteUser, showAllUser, loginUser } from '../controllers/user.js';

const adminRouter = express.Router()

// Allow admin to access a login page at /admin/login
adminRouter.get('/login', (req, res) => {
    return res.render('login');
});

// Accept POST /admin/login (form can submit to current path)
adminRouter.post('/login', loginUser);

adminRouter.get('/home',authMiddleware,(req,res)=>{
    res.render('home');
})
adminRouter.get('/delete-user',authMiddleware,(req,res)=>{
    res.render('deleteUser');
})
adminRouter.post('/delete-user',authMiddleware,deleteUser)
adminRouter.get('/show-all-user',authMiddleware,showAllUser)

export default adminRouter