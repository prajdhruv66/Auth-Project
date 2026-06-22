import express from 'express'
import connectMogoose from './database/db.js'
const app = express()
const port = 3000

app.listen(port, ()=>console.log(`server started! at port:${port}`));

// connect to db
connectMogoose("mongodb+srv://prodhruvpraj999_db_user:ASkXfzIQph8N3XzL@cluster0.g5rw1uu.mongodb.net/?appName=Cluster0","AuthDb");

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