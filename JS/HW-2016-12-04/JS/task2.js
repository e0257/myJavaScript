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

let prom = api.then(function(res){
	return res.json();
})
.then(function(person){
	//name
	let name = Promise.resolve(person.name);
	
	let getFilms = person.films.map(url => fetch(url));
	let getSpecies = person.species.map(url => fetch(url));

	//films
	let films = Promise.all(getFilms)
			.then( res => {
				let  films = res.map(res => res.json());
				return Promise.all(films);
			}).then (res => {
				let result = res.map(el => el.title);
				return Promise.all(result);
			});

	//species, language, same origin
	let species = Promise.all(getSpecies)
			.then( res => {
				let  species = res.map(res => res.json());
				return Promise.all(species);
			}).then (res => {
				let name = res.map(el => el.name);
				let language = res.map(el => el.language);
				let getPeople = res.map(res => {
					let getPeople = res.people.map(url => fetch(url));

					return  Promise.all(getPeople)
					.then(res => {
						let  people = res.map(res => res.json());
						return Promise.all(people);
					}).then(res => {
						 let people = res.map(el => el.name);
						return Promise.all(people);
					})
				})
			return Promise.all([name, language].concat(getPeople))
				.then(res => ({spec: res[0], lang: res[1], same: res[2]}));
			});


	return Promise.all([name, films, species])
		.then(res => ({name: res[0], films: res[1], species: res[2].spec, language: res[2].lang, same: res[2].same}));

})
.then(result => {
console.log(`Name: ${result.name} 
Films: ${result.films}
Species: ${result.species}
Language: ${result.language}
Same Origin: ${result.same}
`);
});

