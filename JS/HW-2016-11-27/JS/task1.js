
class Bar {
	constructor(name, barmens=[], waiters=[], drinks=[], money = 0, orders = []){
		this.name = name;
		this.barmens = barmens;
		this.waiters = waiters;
		this.drinks = drinks;
		this.money = money;
		this.orders = orders;
	}

	addStock(drink){
		let preferDrink = this.drinks.find( el => el.name == drink.name);
		if (preferDrink) {
			preferDrink.count += drink.count;
		}
		else {
			this.drinks.push(drink);
		}
	}

	addEmployee(name, age, position){
		if (position.toLowerCase() == "barmen"){
			this.barmens.push(new Barmen(name, age, this));
		}
		else if (position.toLowerCase() == "waiter"){
			this.waiters.push(new Waiter(name, age, this));
		}
	}

	fareEmployee(name, position){
		let index;
		if (position.toLowerCase() == "barmen"){
			index = this.barmens.findIndex(el => el.name == name);
			this.barmens.splice(index, 1);

		}
		else if (position.toLowerCase() == "waiter"){
			index = this.waiters.findIndex(el => el.name == name);
			this.waiters.splice(index, 1);
		}
	}

    shareTips(){
    	let countOfEmployees = 0;
    	this.barmens.forEach(el => countOfEmployees++);
    	this.waiters.forEach(el => countOfEmployees++);
    	console.log(`${(this.money/countOfEmployees).toFixed(2)} dollars for each employee`);
    }

};

class Person {
	constructor(name, age){
		this.name = name;
		this.age = age;
	}
}

class Barmen extends Person{
	constructor(name, age, bar){
		super(name, age);
		this.bar = bar;
	}

	completeOrder(drink){
		let order = this.bar.orders.find(el => el.name == drink);
		let index = this.bar.orders.findIndex(el => el.name == drink);
		
		if (order) {
			let preferDrink = this.bar.drinks.find( el => el.name == order.name);
			console.log(preferDrink);
			if (preferDrink) {
				preferDrink.count -= order.count;
				console.log(`Order ${order.name}: ${order.count} is complete`);
				this.bar.orders.splice(index, 1);
			}
		}
		else console.log(`For drink "${drink}" the orders are absent `);
	}
};

class Waiter extends Person{
	constructor(name, age, bar){
		super(name, age);
		this.bar = bar;
	}

	getTips(tips){
		this.bar.money += tips;
	}

	getOrder(drink, count){
		let chooseDrink = this.bar.drinks.find(el => el.name == drink && (el.count - count) >= 0);
		if (chooseDrink){
		this.bar.orders.push(new Drink(drink, count));
		}
		else console.log('The drink is not enough got your order');
	}
};

class Drink {
	constructor(name, count){
		this.name = name;
		this.count = count;
	}
}

let bar = new Bar("Kapone"); //новый бар

bar.addStock(new Drink("Martini", 20)); //доб Мартини
bar.addStock(new Drink("Martini", 20)); // доб еще Мартини
bar.addStock(new Drink("Rom", 10)); // доб Ром
console.log(bar);

bar.addEmployee ("Petro", 23, "Barmen"); //нанять бармена
bar.addEmployee ("Vasya", 22, "WAIter"); //нанять официанта
bar.addEmployee ("Marta", 30, "Barmen"); //нанять бармена
bar.addEmployee ("German", 44, "WAIter"); //нанять официанта
console.log(bar);
bar.fareEmployee("German","WAIter"); //уволить официанта
console.log(bar);


bar.waiters[0].getOrder("Rom", 10); //Взять заказ
bar.waiters[2].getOrder("Martini", 50); //Взять заказ
console.log(bar);
bar.barmens[0].completeOrder("Rom"); //Выполнить заказ по Рому
bar.barmens[0].completeOrder("Brendi"); //Выполнить заказ по Бренди
console.log(bar);
bar.waiters[0].getTips(10); //собрать чаевые
bar.waiters[0].getTips(20);	//собрать чаевые
console.log(bar);
bar.shareTips(); //поделить чаевые
