let nums = [1, 2, 3, 5, 8, 13, 21, 34];
let str = ["this", "is", "a", "very", "long", "array", "which", "has", "absolutely", "no", "sense"];

/*1*/
let doubleValue = [];
nums.forEach( function(e) {
	 doubleValue.push(e*2);
	 	});
console.log('Удвоенный массив' + doubleValue);
/*2*/
let evenNumber = nums.some(function(e){return e%2==0});
if (evenNumber) {
	console.log("Четные числа есть");
}
else console.log("Четные чисел нет");
/*3*/
let simpleStr = str.join(" ");
console.log(simpleStr);
/*4*/
let numberOfLetters = [];
str.forEach(function(e){
	numberOfLetters.push( e +" - " + e.length);
})
console.log(numberOfLetters);
/*5*/
let arrMoreThen4 = [];
str.forEach(function(e){
	if (e.length>3) arrMoreThen4.push(e);
})
console.log(arrMoreThen4);
/*6*/
let notEvenNumber = [];
nums.forEach(function(e){
	if (e%2 != 0) notEvenNumber.push(e);
})
console.log(notEvenNumber);
/*7*/
let  sumIs100 = 0;
nums.forEach( function(e) {
 		sumIs100 += e;
 });
if (sumIs100>100){
	console.log("Сумма чисел больше 100");
}
else console.log("Сумма чисел меньше 100");
/*8*/
let sortArr = str;
sortArr.sort(function(a,b){
		if (a.length > b.length) return 1;
		if (a.length < b.length) return -1;
		else return 0;
	}
);
console.log(sortArr);

/*9*/
let indexOfLongWord = 0;
let lengthOfWord = 0;
str.forEach(function(e,i){
	if (lengthOfWord < e.length) {
		indexOfLongWord = i;
       lengthOfWord = e.length;
    }
})
console.log("Индекс самого длинного слова:" + indexOfLongWord);
/*10*/
let bigArr = [];
console.log(bigArr.concat(nums,str));
