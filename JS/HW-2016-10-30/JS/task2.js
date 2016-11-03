let random_num, cntP1, cntP2, answP1, answP2, restart="N";

alert("Добро пожаловать");
do {
cntP1=0; cntP2=0;answP1="Y";answP2="Y";

while (answP1==="Y") {
answP1=prompt("Игрок1, количество ваших очков сейчас: "+ cntP1 +" Вы хотите сгенерировать число? Впишите Y или N");
if (answP1==="N"){
	break;
}
else if (answP1==="Y"){
	random_num=Math.round(Math.random()*11+0.5);
	alert("Ваше число: "+random_num);
	cntP1+=random_num;
		if (cntP1>21){
			alert("Вы проиграли. Сумма выших очков больше 21. У вас: "+ cntP1);
			break;
		}
}
else {
	alert("Вы должны вводить только Y или N");
	answP1="Y";
}
}

while (answP2==="Y") {
if(cntP1>21){ 
	break;
}
answP2=prompt("Игрок2, количество ваших очков сейчас: "+ cntP2 +" Вы хотите сгенерировать число? Впишите Y или N");
if (answP2==="N"){
	break;
}
else if (answP2==="Y"){
	random_num=Math.round(Math.random()*11+0.5);
	alert("Ваше число: "+random_num);
	cntP2+=random_num;
		if (cntP2>21){
			alert("Вы проиграли. Сумма выших очков больше 21. У вас: "+ cntP2);
			break;
		}
}
else {
	alert("Вы должны вводить только Y или N");
	answP2="Y";
}
}

if (cntP2 > 21) {
	alert("Выиграл Игрок1");
}
else if (cntP1===cntP2){
	alert("Ничья");
}
else if (cntP1>cntP2 && cntP1<21){
	alert("Выиграл Игрок1");
}
else {
	alert("Выиграл Игрок2");
}

restart= prompt("Хотите сыграть еще? Y/N?");

} while (restart=="Y")

alert("Спасибо за игру");