let str = "2016/05/20-12:00:35+0300";


function timeStamp(str) {
let parseStr = str.match(/\w+/g),
    year = +parseStr[0],
    month = +parseStr[1]-1,
    day = +parseStr[2],
    hour = +parseStr[3],
    minute = +parseStr[4],
    second = +parseStr[5];
  
  
let date = new Date(year, month, day, hour, minute, second);
 

console.log(date.getTime());
	
}

timeStamp(str);
