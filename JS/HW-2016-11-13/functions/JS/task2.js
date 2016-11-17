function func_arg(){
	let result="";
	for(i=0; i<arguments.length; i++){
		result +=arguments[i]+" ";
		}
	return result;
}

function func_rest(...param){
	let result="";
	param.forEach( function(e){
		result += e + " ";
    }
		)
    return  result;
}


console.log(func_arg(false,"ffff", 22, 6574));
console.log(func_rest(1, true, "eeee"));