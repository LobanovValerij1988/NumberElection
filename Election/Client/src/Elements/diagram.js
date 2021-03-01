import React,  {useState,  useEffect } from "react"; 
import * as d3 from 'd3';
const serverInfo=require("./config")
const axios = require('axios').default;

function  FigureForVote(number,rate){
this.number=number;
this.rate=rate;
}
function Diagram() {
function getElectionResults(e){
  axios.post( `${serverInfo.serverhost}/statistic`, {params:{date: e.target.value}}).then(function (result) {   
    const numbers=[];
    if(result.data.length>0){  
       for(let i=0;i<result.data.length;i++) {    
        numbers[i]= new FigureForVote(result.data[i].number,result.data[i].count);                    
       }
       CreateDiagramm(numbers);
     }
     else{
      document.getElementById("diagr").innerHTML=null;
      document.getElementById("diagr").innerText=" there is no result of election on this date";
     }

  }).catch(function (error) {
    alert(error);
  });
}

function CreateDiagramm(numbers){
   let height = 500, 
  width = 500, 
  margin=30;   
// функция для получения цветов
var color = d3.scale.category10();
// задаем радиус
var radius = Math.min(width - 2*margin, height- 2*margin) / 2;
// создаем элемент арки с радиусом
var arc = d3.svg.arc()
  .outerRadius(radius)
  .innerRadius(0);
   
var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) { return d.rate; });
document.getElementById("diagr").innerHTML=null;
document.getElementById("diagr").innerText="result of election";
var svg = d3.select("#diagr").append("svg")
      .attr("class", "axis")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", 
          "translate(" +(width / 2) + "," + (height / 2 ) + ")");
var g = svg.selectAll(".arc")
.data(pie(numbers))
.enter().append("g")
.attr("class", "arc");  

g.append("path")
.attr("d", arc)
.style("fill", function(d) { return color(d.data.number); });

g.append("text")
  .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")"; })
  .style("text-anchor", "middle")
  .text(function(d) { return d.data.number; });
  }

  return (
   <div>
   <label for="myDate">Choose  date to see numbers results </label>
   <input type="date"  id="myDate" onChange={getElectionResults} />
   <div id="diagr" ></div>
   </div>
  );
}

export default Diagram;
