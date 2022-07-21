import mongoose from "mongoose";
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";

const app = express();

dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE;
const PORT = process.env.PORT;


const msg = "Bera";

mongoose.connect(DB,{
    useNewUrlParser:true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify:false
}).then(()=> {
    console.log('Success');
}).catch((err)=>console.log(err));

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    data:{
        type:Date,
        default: Date.now
    }
})

const User = new mongoose.model("USER",userSchema);


const usr = new User({name:msg});
const res = await usr.save();