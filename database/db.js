import mongoose from "mongoose";

const connectMongoose = async (connString,dbName) =>{
    await mongoose.connect(String(connString),{dbName:String(dbName)})
    .then(()=>console.log(`${dbName} is connected to your server...`))
    .catch((error)=>console.log(error));
}

export default connectMongoose