import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const createUser = async (req,res)=>{
    const {name,email,password,role} = req.body;
    
    try {
        // If trying to create an admin, check if one already exists
        if (role === 'admin') {
            const existingAdmin = await User.findOne({ role: 'admin' });
            if (existingAdmin) {
                return res.render('signup', {message: 'Admin already exists. You cannot create another admin.'});
            }
        }
        
        const user = await User.findOne({ email: email }); 
        if(!user){
            const hashedPassword = await bcrypt.hash(password,10);
            const userData = await User.create({
                name:name,
                email:email,
                password:hashedPassword,
                role:role
            })
            if(userData) res.redirect('/login');
            else res.redirect('/signup');
        }
        else if(user){
            res.render('signup', {message: 'Email already exists. Please use a different email.'});
        }
    } catch (error) {
        console.log(error.message);
        res.render('signup', {message: 'Error creating user'});
    }
}


export const loginUser = async (req,res)=>{
    const {email, password, role} = req.body;

    const user = await User.findOne({ email: email }); 
    if(user){
        // Check if selected role matches user's role
        if (user.role !== role) {
            return res.render('login', {message: `Invalid role selected. You are registered as a ${user.role}.`});
        }
        
        const validUser = await bcrypt.compare(password,user.password);
        if(validUser) {
            try {
                const token = jwt.sign({userId: user._id,name:user.name,role:user.role}
                ,process.env.JWT_SECRET,
                {expiresIn:'5m'})

                res.cookie('token',token,{
                    httpOnly:true,
                    secure:false
                })
                
                if (user.role === "admin") {
                    res.redirect("/admin/home");
                } else {
                    res.redirect("/user/home");
                } 
            } catch (error) {
                console.log(error.message);
                return res.redirect('/login');
            }
        }
        else res.render('login',{message:`please enter valid credential`});
    }
    // if no email found in db
    else if(!user) res.render('login',{message: 'Email not found. Please signup first...'});
}

export const showAllUser = async (req, res) => {
    const role = res.locals.user.role;

    if (role !== 'admin') {
        return res.status(403).json({
            message: 'Unauthorized',
            status: false
        });
    }

    try {
        const allUsers = await User.find({ role: 'user' });

        return res.render('allUser', { allUsers });
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot fetch all users',
            status: false
        });
    }
};

export const deleteUser = async (req, res) => {
    const { email } = req.body;
    const role = res.locals.user.role;

    if (role !== 'admin') {
        return res.status(403).json({
            message: 'Unauthorized',
            status: false
        });
    }

    try {
        const result = await User.deleteOne({
            email,
            role: 'user'
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'User not found',
                status: false
            });
        }

        return res.render('deleteUser', {
            message: 'User deleted successfully',
            status: true,
            showAlert: true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'User is not deleted',
            status: false
        });
    }
};