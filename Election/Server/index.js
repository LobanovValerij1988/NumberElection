const mysql = require("mysql2");
const config = require("./Config/config");
const sql=require("./sqlQuery/query");
const myFunction=require("./sqlQuery/serverFunction");
const express=require('express');
var cors = require('cors');
const app=express();
const jsonParser = express.json()

async function start(){
  try{
     app.listen(config.appPort,()=>console.log(`App has been start on port ${config.appPort}...`)); //port
  }catch(e){
    console.log('Server Error',e.message)
    process.exit(1)//if error we exit 1 -exit with mistake
  }
}

start();
app.use(cors({origin: config.clientHost}));

const connection = mysql.createConnection({
    host:config.host ,
    user:config.login ,
    database:config.db ,
    password: config.password
  });

 function SaveLog(url,json,date,connection){
  const log = [url,json,date];
  connection.query(sql.addNewLog,log, function(err, results){
       if(err) console.log(err.message);         
  }); 
 }

  app.get("/logs", jsonParser, function (req, res) {
      connection.query(sql.GetLogs, function(err, results, fields) {
      if(err) console.log(err);
        else{
          res.send(results);
          SaveLog(req.url,null,myFunction.getCurrentTime(),connection);
        }
      })
})

  app.post("/statistic", jsonParser, function (req, res) {
    if(!req.body) return  res.sendStatus(400);
     connection.query(sql.GetNumbersByDate,req.body.params.date, function(err, results, fields) {
   if(err)console.log(err);
   else{
   res.send(results);
   SaveLog(req.url,null,myFunction.getCurrentTime(),connection);
    }
  })
})

  app.post("/vote", jsonParser, function (req, res) {
  if(!req.body) return  res.sendStatus(400);
  const number = req.body.data;
  const answer={message:'Vote for '+ number+' confirmed'};
  const currentDate=myFunction.getCurrentTime();
  const vote = [number, currentDate];
  connection.connect(function(err){
    if (err)return  res.sendStatus(400);
     else{
      connection.query(sql.addNewVote, vote, function(err, results) {
            if(err)  console.log(err.message);   
               else{
           SaveLog(req.url,JSON.stringify(req.body),myFunction.getCurrentTime(),connection);
           res.send(answer);
        } 
        });      
  }
})
})
 