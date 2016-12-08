; 	
let answer, loop = true;
while (loop) {	
	
	answer = parseInt(prompt("Введите номер персонажа")); 
	if (isNaN(answer) || answer<1 || answer>87){
		alert("Введите целое число от 1 до 87");
		loop = true;
	}
	else loop = false;
}

;

let api = fetch("http://swapi.co/api/people/" + answer + "/");

let result;
let p1,p2,p3;//промисы

let prom = api.then(function(res){
	return res.json();
})
.then(function(person){
	let name, films = [], species = [], language = [], same = [];
	console.log(person);
	//name
	name = person.name;

	//films
	person.films.forEach( e => {
		p1 = fetch(e).then(function(res){
			return res.json();
		})
		.then(function(film){
			films.push(film.title);
		});

	});

	//species, language, same origin
	person.species.forEach( e => {
		p2 = fetch(e).then(function(res){
			return res.json();
		})
		.then(function(spec){
			species.push(spec.name);
			language.push(spec.language);
			spec.people.forEach( e => {
				p3 = fetch(e).then(function(res){
					return res.json();
				})
				.then(function(people){
					same.push(people.name);
				});
			});

		});
	});

			result = {
				name: name, 
				films: films, 
				species: species, 
				language: language,
				same: same
			};
	
})
.catch(function(rej){
	console.log(rej);
});


Promise.all([prom, p1, p2, p3]).then(function(res){
		//console.log(result);
});

setTimeout( 
function(){
console.log(`Name: ${result.name} 
Films: ${result.films}
Species: ${result.species}
Language: ${result.language}
Same Origin: ${result.same}
`);
}, 5000);


