import { Kafka } from "kafkajs";
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import dotenv from "dotenv";


const app = express();
app.set('view engine', 'ejs');
app.use(urlencoded());
dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE;
const PORT = process.env.PORT;

console.log("Started");

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
const name = [];

app.get('/',(req,res)=>{
    res.render('home',{data:name});
});
// document.getElementById("demo1").innerHTML = name;
run();

async function run()
{
    try
    {
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["192.168.134.11:9092"]
        })

        const consumer = kafka.consumer({"groupId":"test"});

        console.log("Connecting....")
        await consumer.connect();
        console.log("Connected!")
        
        await consumer.subscribe({
            "topic":"Users",
            "fromBeginning":true
        })
        
        await consumer.run({
            "eachMessage":async result =>{
                name.push(result.message.value);
                const usr = new User({name:result.message.value});
                const res = await usr.save();
                console.log(`Received msg ${result.message.value} `)
            }
        })

        // console.log(`Message added!! - ${JSON.stringify(result)} ${msg}`)
        // await consumer.disconnect();
    }
    catch(ex)
    {
        console.log(`Error ${ex}`)
    }
}
app.listen(2000,function(){
    console.log("Server Running");
});

