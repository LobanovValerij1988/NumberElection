import React,  {useState,  useEffect } from "react"; 
const axios = require('axios').default;
const serverInfo=require("./config");

 function Logs() {
    const [logs, setLogs] = useState([]); 
   
    useEffect( () => {
         axios.get(`${serverInfo.serverhost}/logs`,{}).then(function (result) {
         const mylogs=[];
         if(result.data.length>0){  
            for(let i=0;i<result.data.length;i++) {    
                mylogs[i]=`date ${result.data[i].date} url ${result.data[i].url}   json ${JSON.stringify(result.data[i].json)} `;                   
            }
          }
         else{
            mylogs[0]=("there is no logs in your db")
         }
        setLogs(mylogs);
      }).catch((e => {
        console.log( e);
     }));
    },[]);

   if(logs.length>0){
      return (
         logs.map(i=> <div  key={i}  >{i}</div> )
      );
      }
      else
        return (
      <div>ups something was wrong</div>
      );
      }

export default Logs;
