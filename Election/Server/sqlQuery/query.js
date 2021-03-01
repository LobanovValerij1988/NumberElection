const InsertNewVote = "INSERT INTO vote(number,date) VALUES(?,?)";
const InsertNewLog = "INSERT INTO logs(url,json,date) VALUES(?,?,?)";
const CalculateNumbersByDate = "SELECT number, COUNT(date) as count FROM vote WHERE date = ? GROUP BY number; ";
const GetallLogs="SELECT url,json, DATE_FORMAT(date,'%Y-%m-%d %k:%i:%s') AS 'date' FROM `logs`";
const table1 = `create table if not exists logs(
    id int primary key auto_increment,
    url  varchar(255) not null,
    json  json,
    date datetime not null
  )`;
const table2 = `create table if not exists vote (
    id int primary key auto_increment,
    number int not null,
    date date not null
  )`;
module.exports.addNewVote=InsertNewVote;
module.exports.addNewLog=InsertNewLog;
module.exports.GetNumbersByDate=CalculateNumbersByDate;
module.exports.GetLogs=GetallLogs;
module.exports.tableLogs=table1;
module.exports.tableVote=table2;
