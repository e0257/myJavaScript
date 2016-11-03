let email, domain, zone;

email=prompt("Введите  почту").trim()||"empty";
console.log(email);
domain=email.slice(email.indexOf("@")+1,email.lastIndexOf(".")).length;
zone= email.slice(email.lastIndexOf(".")+1).length;

if (email==="empty"){
	alert("Вы ничего не ввели");
}
else if (email.indexOf("@")<0){
	alert("Нет @");
}
else if(email.slice(0,email.indexOf("@")).length<4){
	alert("Слишком короткий email");
}
else if (domain<1||domain>10){
	alert("domain должен быть больше 1 и меньше 4 символов");
}
else if (zone<2||zone>=5){
	alert("zone должен быть больше 1 и меньше 5 символов");
}
else alert("Добро пожаловать");
