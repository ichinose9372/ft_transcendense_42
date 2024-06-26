function organizeMatchesByRound(matches) {
  const matchesByRound = [];

  const finalMatch = matches.find((match) => match.parentMatchId === "");
  const finalMatchId = finalMatch.matchId;
  matchesByRound.push([finalMatch]);

  let nextMatches = matches.filter(
    (match) => match.parentMatchId === finalMatchId
  );
  while (nextMatches.length > 0) {
    matchesByRound.push(nextMatches);
    const nextMatchIds = nextMatches.map((match) => match.matchId);
    nextMatches = matches.filter((match) =>
      nextMatchIds.includes(match.parentMatchId)
    );
  }
  // console.log("matchesByRound", matchesByRound);
  return matchesByRound;
}

function truncateName(name, maxLength=6) {
  if (name.length > maxLength) {
    return name.slice(0, maxLength) + "...";
  }
  return name;
}

function tournamentDraw() {
  const parent = document.getElementById("tournamentDraw");
  if (parent === null) {
    return;
  }
  const tournamentName = document.getElementById("tournamentNameLabel");
  if (tournamentName === null) {
    return;
  }
  const state = appState.getState();
  const matches = state.matches;

  tournamentName.innerHTML = state.tournament.tournamentName;

  const matchesByRound = organizeMatchesByRound(matches);
  for (let i = 0; i < matchesByRound.length; i++) {
    const matchesInRound = matchesByRound[i];
    const roundDiv = document.createElement("div");
    roundDiv.classList.add("round", "mb-3", "mt-3", "p-1");
    for (let j = 0; j < matchesInRound.length; j++) {
      const matchData = matchesInRound[j];
      const match = new Match(matchData.parentMatchId, matchData.tournamentId);
      match.matchId = matchData.matchId;
      match.leftParticipant = matchData.leftParticipant;
      match.rightParticipant = matchData.rightParticipant;
      match.leftScore = matchData.leftScore;
      match.rightScore = matchData.rightScore;
      match.finishedTimestamp = matchData.finishedTimestamp;

      const matchDiv = document.createElement("div");
      matchDiv.classList.add("match", "mb-3", "mt-3", "p-1");
      matchDiv.setAttribute("data-match-id", match.matchId);
      const leftParticipantTruncated = truncateName(match.leftParticipant);
      const rightParticipantTruncated = truncateName(match.rightParticipant);

      const winner = match.getWinner();

      const leftClass = winner === match.leftParticipant ? 'participant-name winner' : 'participant-name';
      const rightClass = winner === match.rightParticipant ? 'participant-name winner' : 'participant-name';


      matchDiv.innerHTML = `<a href="#" class="${leftClass}" data-bs-toggle="tooltip" title="${match.leftParticipant}">${leftParticipantTruncated}</a> ${match.leftScore} - ${match.rightScore} <a href="#" class="${rightClass}" data-bs-toggle="tooltip" title="${match.rightParticipant}">${rightParticipantTruncated}</a>`;
      roundDiv.appendChild(matchDiv);
    }
    parent.appendChild(roundDiv);
  }

  // tooltipの初期化
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  appState.setState({ matchesByRound });
}
