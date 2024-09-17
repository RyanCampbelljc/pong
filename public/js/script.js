window.addEventListener("DOMContentLoaded", setup);
let socket;
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

function setup() {
	let createLobby = document.getElementById("createLobby");
	let form = document.getElementById("form");
	let input = document.getElementById("lobbyInput");

	form.addEventListener("submit", (e) => {
		console.log("ran");
		e.preventDefault();
		if (input.value) {
			socket = io();
			socket.emit("joinRoom", input.value);
			input.value = "";
		}
	});

	//may not need
	createLobby.addEventListener("click", () => {
		socket = io(); // this initializes the sockets connection to the server
		socket.emit("createLobby");
		socket.on("loadPage", (pageData) => {
			localStorage.setItem("gameCode", pageData.gameCode);
			window.location.href = `/${pageData.page}`;
		});
	});
}
