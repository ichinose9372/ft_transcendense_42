function tournamentDraw() {
  const parent = document.getElementById("tournamentDraw");
  if (parent === null) {
    return;
  }
  const tournamentName = document.getElementById("tournamentName");
  if (tournamentName === null) {
    return;
  }
  const state = appState.getState();
  const matches = state.matches;

  // TODO : 規則的に配置できるようにする

  // leftParticipantとrightParticipantが埋まっているものだけを抽出
  const firstMatches = matches.filter((match) => {
    return match.leftParticipant !== "" && match.rightParticipant !== "";
  });
  const seedMatches = matches.filter((match) => {
    return (
      (match.leftParticipant === "" && match.rightParticipant !== "") ||
      (match.leftParticipant !== "" && match.rightParticipant === "")
    );
  });

  tournamentName.innerHTML = state.tournament.tournamentName;

  for (let i = 0; i < firstMatches.length; i++) {
    const match = firstMatches[i];
    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match");
    matchDiv.classList.add("firstMatch");
    matchDiv.id = `match_${match.getMatchId()}`;
    matchDiv.innerHTML = `
      <div class="participant">${match.getLeftParticipant()} vs ${match.getRightParticipant()}</div>
    `;
    parent.appendChild(matchDiv);
  }
  for (let i = 0; i < seedMatches.length; i++) {
    const match = seedMatches[i];
    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match");
    matchDiv.classList.add("seedMatch");
    matchDiv.id = `match_${match.getMatchId()}`;
    const participant =
      match.getLeftParticipant() || match.getRightParticipant();
    matchDiv.innerHTML = `
      <div class="participant">${participant}</div>
    `;
    parent.appendChild(matchDiv);
  }
}
