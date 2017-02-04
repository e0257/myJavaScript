;(function(){
"use strict";

let respObj;
let measurement = "cel";
let chooseDayId = "day_0";
let todayHtml;
let response;

let days = {
	0: "Sunday",
	1: "Monday",
	2: "Tuesday",
	3: "Wednesday",
	4: "Thursday",
	5: "Friday",
	6: "Saturday"
};

let weatherIcons = {
	"clear-day": "/img/png/Sunny.png" ,
	"clear-night": "/img/png/Moon.png", 
	"rain": "/img/png/Rain.png", 
	"snow": "/img/png/Light_snow.png", 
	"sleet": "/img/png/Day_lightcloud_sleet.png", 
	"wind": "/img/png/Thunder..png", 
	"fog": "/img/png/Overcast.png", 
	"cloudy": "/img/png/Cloudy.png", 
	"partly-cloudy-day": "/img/png/Cloudy_Daytime.png",
	"partly-cloudy-night": "/img/png/Cloudy_Nighttime.png"
}

let dateToday = new Date();
let dayToday = days[dateToday.getDay()];

console.log(dayToday);

navigator.geolocation.getCurrentPosition(onAllow, onError);

function onAllow(data){
	let {latitude, longitude} = data.coords,
	baseUrl = "https://api.darksky.net/forecast",
	api = "511f552b6f363c1f0bf21e252a8b6a99";

	$.ajax({
	url: `${baseUrl}/${api}/${latitude},${longitude}`,
	dataType: "jsonp",
	success(data){
		console.log(data);
		setWeather(data);
		response = data;
	}
	
	});
}
function onError(){
	console.log("error");
}

function setWeather(obj){
	let elem = Array.from($("#main-deegree").add(".dayDeegree"));
	elem.forEach( el => {
		let id = +el.id.replace("dayDeegree_", "");
		let dayWeather = obj.daily.data[id]
		if (dayWeather){
			
			let maxT = Math.round((dayWeather.temperatureMax-32)/2), 
				minT = Math.round((dayWeather.temperatureMin-32)/2); 
			$("#max_"+id).text(maxT);
			$("#min_"+id).text(minT);
			$("#dw_"+id).text(setDayOfWeek(id));
			$('#day_'+id).append("<img src="+weatherIcons[dayWeather.icon]+">");

		}
		else if (isNaN(elem)){
			let curWeather = obj.currently;
			$('#main-deegree > span').text(Math.round((curWeather.temperature-32)/2));
			$("#dateToday").text(dateToday.getDate()+"."+(dateToday.getMonth()+1)+"."+dateToday.getFullYear()+" "+dayToday);
			$("#main-win").append("<img src="+weatherIcons[curWeather.icon]+">");
			todayHtml = $("#main-win").html();
		}
	});

	$("#"+chooseDayId).css("border", "10px solid green");

}


function setCel(){
	if(measurement == "far"){
		let temp = Array.from($('.tempr'))
		temp.forEach( el => {
			let text = el.innerText;
			el.innerText = Math.round((text-32)/2);
		});
	}
	measurement = "cel";
}

function setFar(){
	if(measurement == "cel"){
		let temp = Array.from($('.tempr'))
		temp.forEach( el => {
			let text = el.innerText;
			el.innerText = Math.round(text*2 +32);
		});
	}
	measurement = "far";
}

function chooseDay(){
	let id = this.id.replace("day_","");
	if (this.id == chooseDayId) return console.log("sfds");
	let chooseDayDate = new Date(response.daily.data[id].time *1000)
	if (id == 0) {
		$("#main-win").html(todayHtml);
	}
	else {
		let content = $("#dayDeegree_"+id).html();
		$("#main-deegree").html(content).css({
			"font-size": "100px",
			"width": "35%"
		});
		$("#dateToday").text(chooseDayDate.getDate()+"."+(chooseDayDate.getMonth()+1)+"."+chooseDayDate.getFullYear()+" "+days[chooseDayDate.getDay()]);
		$("#main-win > img").attr("src", weatherIcons[response.daily.data[id].icon]);
	}	this.style.border = "10px solid green";
		
	$("#"+chooseDayId).css("border", "1px solid black");
		chooseDayId = this.id;
	
	
	}

function setDayOfWeek(id){
	let  today = dateToday.getDay(),
	 choosenDay = today + id;
	if(choosenDay<7)   return days[choosenDay];
	else  return days[choosenDay-7];
}


$('#cel').on("click", setCel);
$('#far').on("click", setFar);
let alldays = $(".all-days");
for (let i = 0; i < alldays.length; i++) {
	//console.log("obj.id");
	alldays[i].addEventListener("click", chooseDay);
}




})();

