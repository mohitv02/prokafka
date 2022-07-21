import { Kafka } from "kafkajs";
import dotenv from 'dotenv';

import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import hbs from 'hbs';

const app = express();


const port = process.env.PORT || 4000;

app.use(urlencoded());



app.get('/',function(req,res){
    res.send(`
    <form action="/" method="POST">
        <input type="text" name="name" placeholder="Enter Name"/>

        <input type="submit" name="submit_button" value="Add"/>
    </form>
    `);
});


console.log("Started");

var msg;
app.post('/',function(req,res){
    msg = req.body.name;
    console.log(msg)
    if(req.body.submit_button)
    // var i=0
    // while(i<100)
    // {
       
    //     i+=1;
    // }
    run();
        // console.log(msg)
})

// const msg = process.argv[2];
// run();

async function run()
{
    try
    {
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["192.168.134.11:9092"]
        })

        const producer = kafka.producer();

        console.log("Connecting....")
        await producer.connect();
        console.log("Connected!")
        
        // partition = 0;
        
        const result = await producer.send({
            "topic":"Users",
            "messages":[
                {
                    "value":msg,
                    "partition":0
                }
            ]
        })
        
        console.log(`Message added!! - ${JSON.stringify(result)} ${msg}`)
        await producer.disconnect();
    }
    catch(ex)
    {
        console.log(`Error ${ex}`)
    }
    // finally
    // {
    //     process.exit(0);
    // }
}

app.listen(port,function(){
    console.log("Server Running");
});
