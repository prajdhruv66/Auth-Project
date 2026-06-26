import express from 'express'
import { authMiddleware, restrictTo } from '../middlewares/auth.js'
import { deleteUser, showAllUser } from '../controllers/user.js';

const adminRouter = express.Router()

adminRouter.get('/home', authMiddleware, restrictTo('admin'), (req, res) => {
    res.render('home', { user: res.locals.user });
})

adminRouter.get('/delete-user', authMiddleware, restrictTo('admin'), (req, res) => {
    res.render('deleteUser');
})

adminRouter.post('/delete-user', authMiddleware, restrictTo('admin'), deleteUser)
adminRouter.get('/show-all-user', authMiddleware, restrictTo('admin'), showAllUser)

export default adminRouter