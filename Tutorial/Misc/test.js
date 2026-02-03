var date = "2000-11-14";
var date2 = new Date(date);
var month = Number(date2.getMonth());
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
console.log(date);
console.log(months[month]);
console.log(date2.getFullYear());
console.log(date2.getDate());