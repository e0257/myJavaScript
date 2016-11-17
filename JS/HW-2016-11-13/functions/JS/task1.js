  let cnt_start = +prompt("Введите начальное значение счетчика");
  let cnt_step = +prompt("Введите шаг счетчика");
  let cnt_iter = +prompt("Введите количество итераций для счетчика");
  let sum = cnt_start;
  let result = 0;

function count() {
    sum += cnt_step;
    return sum;
}

for (i = 0; i < cnt_iter; i++){
    result=count(); 
  }
  alert (`Ваш результат ${result}`);
 
