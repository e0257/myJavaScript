Date.prototype.getCustomFormat = function(format){
	let nameOfMonth = ["January", "February", "March" , "April", "May", "June", "July",
	"August", "September", "October", "November", "December"];
	let thisdate = this;

	let arrFullDate = format.trim().split(" ");
	//year, month, day
	if (arrFullDate[0].indexOf("-") > 0){
		let firstDate = arrFullDate[0].split("-");
		firstDate.forEach(function(e, i , arr){
			if (e === "YY") arr[i] = ("" + thisdate.getFullYear()).slice(2);
			else if (e === "YYYY") arr[i] = thisdate.getFullYear();
			else if (e === "MM") arr[i] = thisdate.getMonth() + 1;
			else if (e === "MMMM") arr[i] = nameOfMonth[thisdate.getMonth()];
			else if (e === "DD")  arr[i] = thisdate.getDate();
		});
		//add lead zero
		firstDate.forEach(function(e, i, arr){
			if (typeof e === "number" && e < 10){
				arr[i] = "0" + arr[i];
			}
		});

		arrFullDate[0] = firstDate.join("-");
	};

	//hour, minute, second
	if (arrFullDate[0].indexOf(":")> 0 && arrFullDate[1] === undefined){
		let secondDate = arrFullDate[0].split(":");
		secondDate.forEach(function(e, i , arr){
			if (e === "HH") arr[i] = thisdate.getHours();
			else if (e === "mm") arr[i] = thisdate.getMinutes();
			else if (e === "ss") arr[i] = thisdate.getSeconds();
			});
		//add lead zero
		secondDate.forEach(function(e, i, arr){
			if (typeof e === "number" && e < 10){
				arr[i] = "0" + arr[i];
			}
		});
		arrFullDate[0] = secondDate.join(":");
	}
	else if (arrFullDate[1].indexOf(":") > 0){
		let secondDate = arrFullDate[1].split(":");
		secondDate.forEach(function(e, i , arr){
			if (e === "HH") arr[i] = thisdate.getHours();
			else if (e === "mm") arr[i] = thisdate.getMinutes();
			else if (e === "ss") arr[i] = thisdate.getSeconds();
			});
		//add lead zero
		secondDate.forEach(function(e, i, arr){
			if (typeof e === "number" && e < 10){
				arr[i] = "0" + arr[i];
			}
		});
		arrFullDate[1] = secondDate.join(":");
	}
	
	//return result
	if (arrFullDate[1]) {
		return `${arrFullDate[0]} ${arrFullDate[1]}`;
	}
	else return `${arrFullDate[0]}`;
}
;

let someDate = new Date();

console.log(someDate.getCustomFormat("DD-MM-YY HH:mm:ss"));
console.log(someDate.getCustomFormat("HH:mm:ss"));
console.log(someDate.getCustomFormat("MMMM-2016 HH:mm"));