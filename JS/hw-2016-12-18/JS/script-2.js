; (function () {
"use strict";


let users = [
{name: "Bob", id: "bob", age: 20, default: true},
{name: "Ms Aclice", id: "alice", age: 21},
{name: "Ivan", id: "ivan", age: 23}
];


window.addEventListener("popstate", renderPerson);
document.body.addEventListener("click", handleClick);

function handleClick(ev) {
	 if (ev.target.localName === "a") {
	 	ev.preventDefault();
	 	let id = ev.target.getAttribute("href").slice(1);

	 	history.pushState({ "id": id }, "", `${location.origin}/${id}`)

	 }
}

function renderPerson(ev) {
	console.log (ev);

	if (!ev.state) return;

	let user = user.find(el => el.id === ev.state.id),
data = `${user.name},${user.age}`;

document.querySelector("p").textContent = data;

}

})();
