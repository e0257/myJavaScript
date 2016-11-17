function noVowel(str){
var arr = str.toUpperCase().split("");
var arr_vowel = ["A","E","Y","U","I","O"];
var result = [];

arr.forEach(function (e,i) {
	if (!arr_vowel.includes(e)){
		result.push(e);
	}
})
console.log(result.join(""));
}

noVowel("Mama mila ramu!");