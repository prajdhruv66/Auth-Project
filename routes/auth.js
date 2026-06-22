import express from 'express'
import { createUser, deleteUser, loginUser, showAllUser } from '../controllers/user.js'
import { authMiddleware } from '../middlewares/auth.js'

const authRouter = express.Router()

authRouter.get('/login', (req, res) => {
    return res.render('login');
});

authRouter.get('/signup', (req, res) => {
    return res.render('signup');
});

authRouter.post('/signup', createUser);

// Allow POST to /login (root) so the login form can submit to the
// current path (action="") when rendered at /login.
authRouter.post('/login', loginUser);

authRouter.get('/allUser', authMiddleware, showAllUser)

authRouter.get('/deleteUser',(req,res)=>{
    return res.render('deleteUser');
})
authRouter.post('/deleteUser',deleteUser);
authRouter.post('/allUser',showAllUser);
authRouter.get('/dashboard',(req,res)=>{
    return res.render('dashboard');
})
export default authRouter;