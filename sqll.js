import { createConnection } from 'mysql';  
var con = createConnection({  
  host: "192.168.134.11",  
  user: "root",  
  password: "Newgen",
});  
con.connect(function(err) {  
    if (err) 
      throw err;  

    console.log("Connected!");  

    con.query("CREATE DATABASE mpdb1", function (err, result) 
    {  
      if (err) throw err;  
        console.log("Database created");  
    });

    var sql = "CREATE TABLE attendance (name VARCHAR(255), date DATETIME)";  

    con.query(sql, function (err, result) 
    {  
      if (err) 
        throw err;  
      console.log("Table created");  
      con.end();
    });  
});  
// const xx="Anmol";


//   con.connect
//   (   function(err) 
//       {  
//         if (err) 
//           throw err;  
//         console.log("Connected!");  
//         var sql = `INSERT INTO attendance (name, date) VALUES ('${xx}', NOW())`;  
//         con.query(sql, function (err, result) 
//         {  
//           if (err) throw err;  
//           console.log("1 record inserted");  
//           con.end();
//         });
//         con.query("SELECT * FROM attendance", function (err, result) {  
//         if (err) throw err;  
//         console.log(result);  
//         });  
        
//   });
//   // con.end();
