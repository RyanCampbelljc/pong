window.addEventListener("DOMContentLoaded", setup);

function setup() {
  let createLobby = document.getElementById("createLobby");
  let form = document.getElementById("form");
  let input = document.getElementById("lobbyInput");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
      //   console.log(input.value);
      input.value = "";
    }
  });
}
