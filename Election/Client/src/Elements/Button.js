import { useState } from "react";
const axios = require('axios').default;
const serverInfo=require("./config");

export default function Button(props)
{
  const [ number, setNumber] = useState(props.number);
  const handlerClick = () =>{
  
    axios.post( `${serverInfo.serverhost}/vote`,{data:number}).then(function (result) {   
  alert(result.data.message);
  window.location.href ="/logs";   
  }).catch(function (error) {
    alert(error);
  });
    }      

    return ( 
 <div>
 <button  onClick={handlerClick}>{number}</button>
 </div>);    
}