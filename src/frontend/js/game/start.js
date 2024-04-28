function addPlayer() {
  const playerList = document.getElementById("playerList");
  const playerCount = playerList.children.length + 1;
  const newPlayerDiv = document.createElement("div");
  newPlayerDiv.classList.add("mb-4");
  newPlayerDiv.innerHTML = `
			<form id="user${playerCount}" class="input-group">
				<input type="text" class="form-control" id="name${playerCount}" placeholder="player name" oninput="checkStartButtonValid()"/>
				<button type="button" class="btn btn-danger input-group-append" onclick="removePlayer('user${playerCount}')")>
					<i class="bi bi-trash"></i>
				</button>
			</form>
	`;
  playerList.appendChild(newPlayerDiv);
  checkStartButtonValid();
}

function removePlayer(userId) {
  const userElement = document.getElementById(userId);
  const parentElement = userElement.parentNode;
  if (parentElement) {
    parentElement.remove();
  }
  checkStartButtonValid();
}

function startGame() {
  const playerList = document.getElementById("playerList");
  const players = [];
  for (let i = 0; i < playerList.children.length; i++) {
    const playerForm = playerList.children[i].querySelector("form");
    const playerNameInput = playerForm.querySelector("input[type='text']");
    const playerName = playerNameInput.value.trim();
    if (playerName) {
      if (players.includes(playerName)) {
        alert("Player names must be unique.");
        return;
      }
      players.push(playerName);
    }
  }
  const tournamentName = document.getElementById("tournamentName").value.trim();

  if (players.length > 1 && tournamentName !== "") {
    const data = {
      tournament: { name: tournamentName },
      participants: players.map((player) => ({ name: player })),
    };
    console.log("data", data);
    confirm("check console for data");
  } else {
    alert("Please enter a tournament name and at least two players.");
  }
}

function checkStartButtonValid() {
  let playerValid = true;
  const playerList = document.getElementById("playerList");
  if (playerList === null) {
    return;
  }
  const tournamentName = document.getElementById("tournamentName").value.trim();
  if (tournamentName === null) {
    return;
  }
  for (let i = 0; i < playerList.children.length; i++) {
    const playerForm = playerList.children[i].querySelector("form");
    const playerNameInput = playerForm.querySelector("input[type='text']");
    const playerName = playerNameInput.value.trim();
    if (playerName === "") {
      playerValid = false;
      break;
    }
  }
  const startButton = document.getElementById("startGameButton");
  if (tournamentName !== "" && playerValid) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
}

function startEventHandlers() {
  const startGameButton = document.getElementById("startGameButton");
  const addPlayerButton = document.getElementById("addPlayer");
  const tournamentNameInput = document.getElementById("tournamentName");

  if (startGameButton) {
    startGameButton.addEventListener("click", () => {
      // TODO : 画面遷移またはmodal
      startGame();
    });
  }

  if (addPlayerButton) {
    addPlayerButton.addEventListener("click", addPlayer);
  }

  if (tournamentNameInput) {
    tournamentNameInput.addEventListener("input", checkStartButtonValid);
  }
  checkStartButtonValid();
}

function initStart() {
  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("popstate", () => {
      handlePopState();
    });
    startEventHandlers();
  });
}

initStart();