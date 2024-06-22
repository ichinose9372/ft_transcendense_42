function gameFinishEventHandlers() {
    const gameFinishButton = document.getElementById('gameFinishButton');
    const winnerDisplay = document.getElementById('winner-name');

    if (gameFinishButton) {
        gameFinishButton.addEventListener('click', handleGameFinish);
    }

    if (winnerDisplay) {
        const urlParams = new URLSearchParams(window.location.search);
        const winner = urlParams.get('winner');
        if (winner) {
            winnerDisplay.textContent = `🎉 ${winner} 🎉`;
        }
    }
}

function handleGameFinish() {
    // const savedMatches = JSON.parse(localStorage.getItem("savedMatches"));
    const matches = appState.getStateByKey("matches");
    // console.log("savedMatches: ", savedMatches);
    // console.log("appState at game finish:", appState.getState());
    // console.log("matches: ", matches);
    const tournamentData = appState.getStateByKey("tournament");
    if (!tournamentData) {
        console.log("No tournament data found");
        return;
    }
    const tournament = {
        tournamentId: tournamentData.tournamentId,
        name: tournamentData.tournamentName
    };
    // console.log("tournament: ", tournament);
    const scores = matches.flatMap(match => ([
        {
            matchId: match.matchId,
            score: match.leftScore,
            participantName: match.leftParticipant
        },
        {
            matchId: match.matchId,
            score: match.rightScore,
            participantName: match.rightParticipant
        }
    ]));
    // console.log("scores: ", scores);
    const url = new URL(
        "/" + appState.getStateByKey("language") + "/gamefinish/",
        window.location.origin
      );
    // console.log("url: ", url);
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": "CSRF_TOKEN",
        },
        body: JSON.stringify({scores: scores, tournament: tournament, matches: matches}),
    })
    .then(response => {
        // console.log("response: ", response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // console.log('Success:', data);
        loadPage('/' + appState.getStateByKey("language"), topEventHandlers);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function initGameFinish() {
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("popstate", () => {
        handlePopState();
      });
      gameFinishEventHandlers();
    });
  }

  initGameFinish();
