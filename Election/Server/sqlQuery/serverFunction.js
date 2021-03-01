function getCurrentTime(){
  const now = new Date();
  return now.getFullYear()+"-"+(now.getUTCMonth()+1)+"-"+now.getDate()+" "+now.getHours()
  +":"+now.getMinutes()+":"+ now.getSeconds();
}
 
module.exports.getCurrentTime=getCurrentTime;