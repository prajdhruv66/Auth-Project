import express from 'express'
import { createUser, loginUser } from '../controllers/user.js'

const authRouter = express.Router()

authRouter.get('/', (req, res) => {
    const message = req.query.error;
    return res.render('login', { message });
});

authRouter.get('/login', (req, res) => {
    const message = req.query.error;
    return res.redirect(message ? `/?error=${message}` : '/');
});

authRouter.get('/signup', (req, res) => {
    return res.render('signup');
});

authRouter.post('/signup', createUser);

authRouter.post('/login', loginUser);

export default authRouter;