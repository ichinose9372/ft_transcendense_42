let myModal = null;

function addPlayer() {
  const playerList = document.getElementById("playerList");
  const playerCount = playerList.children.length + 1;
  const newPlayerDiv = document.createElement("div");
  newPlayerDiv.classList.add("mb-4");
  newPlayerDiv.innerHTML = `
			<form id="user${playerCount}" class="input-group">
				<input type="text" class="form-control" id="name${playerCount}" placeholder="player name" maxlength="10" oninput="checkStartButtonValid()"/>
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

function getFormData() {
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
    return {
      tournament: { name: tournamentName },
      participants: players.map((player) => ({ name: player })),
    };
  } else {
    alert("Please enter a tournament name and at least two players.");
  }
}

function startGame() {
  const data = getFormData();
  appState.setState(data);
  const info = makeTournament();
  // appState.clearState();
  appState.setState({
    tournament: info.tournament,
    matches: info.matches,
    participants: info.participants,
  });
  appState.printState();
  myModal = new bootstrap.Modal(document.getElementById("tournamentModal"), {
    keyboard: false,
  });
  // TODO ここでモーダルを表示する, モーダル内の描画とデータの渡し方を考える
  myModal.show();
  tournamentDraw();
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
  const tournamentModal = document.getElementById("tournamentModal");
  const startTournamentButton = document.getElementById(
    "startTournamentButton"
  );
  // TODO : test不要になったら削除する
  const testDataButton = document.getElementById("testDataButton");

  if (startGameButton) {
    startGameButton.addEventListener("click", () => {
      startGame();
    });
  }

  if (addPlayerButton) {
    addPlayerButton.addEventListener("click", addPlayer);
  }

  if (tournamentNameInput) {
    tournamentNameInput.addEventListener("input", checkStartButtonValid);
  }

  if (startTournamentButton) {
    startTournamentButton.addEventListener("click", () => {
      console.log("start tournament");
    });
  }

  // TODO : test不要になったら削除する
  if (testDataButton) {
    testDataButton.addEventListener("click", testDataPush);
  }

  // modalが閉じるときに背景のmodal-backdropを削除する
  if (tournamentModal) {
    tournamentModal.addEventListener("hidden.bs.modal", function () {
      const tournamentDraw = document.getElementById("tournamentDraw");
      if (tournamentDraw) {
        tournamentDraw.innerHTML = "";
      }
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());

      document.body.classList.remove("modal-open");
    });
  }

  // Enterキーでsubmitされないようにする
  const inputs = document.querySelectorAll('#playerList input[type="text"]');
  inputs.forEach((input) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        return false;
      }
    });
  });

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
