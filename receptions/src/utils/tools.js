export function formatDate(obj){
  var date =  new Date(obj);
  var y = 1900+date.getYear();
  var m = "0"+(date.getMonth()+1);
  var d = "0"+date.getDate();
  var hour=date.getHours();
  var minute=date.getMinutes();
  var second=date.getSeconds();
  return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length)+' '+ hour+":"+minute+":"+second;
}
