import express from 'express'
import { authMiddleware, restrictTo } from '../middlewares/auth.js';
const router = express.Router()

// user and admin can both access user-facing pages
router.get('/home', authMiddleware, restrictTo('user', 'admin'), (req, res) => {
    res.render('home', { user: res.locals.user });
})

router.get('/dashboard', authMiddleware, restrictTo('user', 'admin'), (req, res) => {
    res.render('dashboard', { user: res.locals.user });
})

export default router