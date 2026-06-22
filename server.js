import express from 'express'
import connectMogoose from './database/db.js'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000

app.listen(port, ()=>console.log(`server started! at port:${port}`));

// connect to db using environment variable MONGO_URI
// Set MONGO_URI in your .env file, e.g.:
// MONGO_URI=mongodb+srv://user:pass@cluster0.example.mongodb.net/?retryWrites=true&w=majority
connectMogoose(process.env.MONGO_URI, process.env.DB_NAME || 'AuthDb');

// middleware for reading submited key-value pairs
app.use(express.urlencoded({extended:true}))

// middleware for cookie
import cookieParser from 'cookie-parser';
app.use(cookieParser());   // must come before routes


// Set view engine for EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files from public folder
import path from 'path'
app.use(express.static(path.join(path.resolve(),'public')));

// creating routes
import router from './routes/user.js';
import adminRouter from './routes/admin.js';
import authRouter from './routes/auth.js';

app.use('/user',router);
app.use('/admin',adminRouter);
app.use('/',authRouter);