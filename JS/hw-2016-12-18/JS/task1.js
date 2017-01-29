;(function(){
"use strict";

let users = [
{name: "Bob", lastname: "Blah", id: "user1", age: 20},
{name: "Jon", lastname: "Smeet", id: "user2", age: 31},
{name: "Fin", lastname: "Mars", id: "user3", age: 19},
{name: "Met", lastname: "Potter", id: "user4", age: 42}
];

window.addEventListener("popstate", changeHist);
window.addEventListener("hashchange", changeHash);
document.body.addEventListener("click", funcCLick);


function funcCLick (ev){
		if (ev.target.localName === "a") {
			let id = ev.target.getAttribute("id"),
				user = users.find( e => e.id == id);
			ev.preventDefault();
			history.pushState({ id }, null, `${location.origin}/${id}/?name=${user.name}&lastname=${user.lastname}&age=${user.age}`);
			
			let data = `Name: ${user.name} \nLast Name: ${user.lastname} \nAge: ${user.age}`;
			document.querySelector("pre").textContent = data;	
		}

}

function changeHist(ev){
	console.log (ev);
	console.log (history);

	if (!ev.state || !ev.state.id) return;

	let user = users.find(el => el.id === ev.state.id),
		data = `Name: ${user.name} \nLast Name: ${user.lastname} \nAge: ${user.age}`;

	document.querySelector("pre").textContent = data;

}

function changeHash(ev){
	let userId = location.pathname.match(/\w+/g)[0],
		hash = location.hash.slice(1),
		data,
		user = users.find(el => el.id === userId);

	if (user && (hash&&hash.includes("="))){
		hash = hash.split("=");
	
		let hashProp = hash[0].trim(),
			hashPropVal = hash[1].trim();

		if (hashProp in user) {
			user[hashProp] = hashPropVal;
			data = `Name: ${user.name} \nLast Name: ${user.lastname} \nAge: ${user.age}`;
			document.querySelector("pre").textContent = data;
		}

	}
}



})();