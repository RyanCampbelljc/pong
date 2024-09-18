window.addEventListener("DOMContentLoaded", setup);
let socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

socket.on("loadPage", (pageData) => {
	localStorage.setItem("gameCode", pageData.gameCode);
	window.location.href = pageData.page;
});

// socket.on("roomCode", (code) => {
// 	localStorage.setItem("gameCode", code);
// 	socket.emit("joinRoom", code);
// });

function setup() {
	let createLobby = document.getElementById("createLobby");
	let form = document.getElementById("form");
	let input = document.getElementById("lobbyInput");

	//Joining a room using a code.
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (input.value) {
			socket.emit("loadMP", input.value);
			input.value = "";
		}
	});

	//creating a lobby
	createLobby.addEventListener("click", () => {
		socket.emit("loadMP");
	});
}
