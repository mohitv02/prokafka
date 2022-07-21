import { Kafka } from "kafkajs";
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'mysql';

var con = createConnection({  
  host: "localhost",  
  user: "root",  
  password: "Mohitv02?",
  database: "mpdb"   
}); 

const app = express();
app.set('view engine', 'ejs');
app.use(urlencoded());


console.log("Started");

const name = [];

app.get('/',(req,res)=>{
    res.render('home',{data:name});
});

con.connect
(   function(err) 
    {  
        if (err) 
            throw err;  

        console.log("Connected! DATABASE");  
    
    }
);  
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
                var xy = result.message.value;
                name.push(result.message.value);
                
                var sql = `INSERT INTO attendance (name, date) VALUES ('${xy}', NOW())`;  
                con.query(sql, function (err, result) 
                {  
                    if (err) throw err;  
                    console.log(`1 record inserted ${xy}`);  
                    // con.end();
                });
                // await con.end((err)=>{
                //     console.log("Disconnected database")
                // });
                console.log(`Received msg ${result.message.value} `)
                // await con.end();

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
app.listen(5000,function(){
    console.log("Server Running");
});

