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

  tournamentName.innerHTML = "Tournament : " + state.tournament.tournamentName;
  // TODO : 規則的に配置できるようにする

  // leftParticipantとrightParticipantが埋まっているものだけを抽出
  const firstMatches = matches.filter((match) => {
    return match.leftParticipant !== "" && match.rightParticipant !== "";
  });
  // const seedMatches = matches.filter((match) => {
  //   return (
  //     (match.leftParticipant === "" && match.rightParticipant !== "") ||
  //     (match.leftParticipant !== "" && match.rightParticipant === "")
  //   );
  // });
  // firstMatchesの中から、親の試合の参加者が片方だけのものを抽出
  const firstMatchesWithSeed = firstMatches.filter((match) => {
    const parentMatchId = match.parentMatchId;
    const parentMatch = matches.find(
      (match) => match.matchId === parentMatchId
    );
    if (parentMatch !== undefined) {
      return (
        (parentMatch.leftParticipant === "" &&
          parentMatch.rightParticipant !== "") ||
        (parentMatch.leftParticipant !== "" &&
          parentMatch.rightParticipant === "")
      );
    }
  });

  // firstMatchesの中から，firstMatchesWithSeedに含まれないものを抽出
  const firstMatchesNoSeed = firstMatches.filter((match) => {
    return !firstMatchesWithSeed.includes(match);
  });

  const groupSeedMatches = firstMatchesWithSeed.map((match) => {
    const parentMatchId = match.parentMatchId;
    const parentMatch = matches.find(
      (match) => match.matchId === parentMatchId
    );
    return {
      firstMatch: match,
      parentMatch: parentMatch,
    };
  });

  const otherMatches = matches.filter((match) => {
    return (
      !firstMatches.includes(match) && !firstMatchesWithSeed.includes(match)
    );
  });

  console.log("firstMatchesNoSeed", firstMatchesNoSeed);
  console.log("groupSeedMatches", groupSeedMatches);
  console.log("otherMatches", otherMatches);

  for (let i = 0; i < groupSeedMatches.length; i++) {
    const groupSeedMatch = groupSeedMatches[i];
    const firstMatch = groupSeedMatch.firstMatch;
    const parentMatch = groupSeedMatch.parentMatch;
    const parentMatchParticipantDiv = document.createElement("div");
    // const firstMatchLeftParticipantDiv = document.createElement("div");
    // const firstMatchRightParticipantDiv = document.createElement("div");
    const firstMatchDiv = document.createElement("div");
    parentMatchParticipantDiv.classList.add(
      "seed-participant",
      "mb-3",
      "mt-3",
      "p-1",
      "text-center"
    );
    // firstMatchLeftParticipantDiv.classList.add(
    //   "participant-left",
    //   "mb-1",
    //   "p-1",
    //   "text-center"
    // );
    // firstMatchRightParticipantDiv.classList.add(
    //   "participant-right",
    //   "mb-1",
    //   "p-1",
    //   "text-center"
    // );
    firstMatchDiv.classList.add(
      "participant-left",
      "mb-1",
      "p-1",
      "text-center"
    );
    parentMatchParticipantDiv.innerHTML =
      parentMatch.leftParticipant || parentMatch.rightParticipant;
    // firstMatchLeftParticipantDiv.innerHTML = firstMatch.leftParticipant;
    // firstMatchRightParticipantDiv.innerHTML = firstMatch.rightParticipant;
    firstMatchDiv.innerHTML =
      firstMatch.leftParticipant +
      " : " +
      firstMatch.leftScore +
      "<br>vs<br>" +
      firstMatch.rightParticipant +
      " : " +
      firstMatch.rightScore;

    parent.appendChild(parentMatchParticipantDiv);
    // parent.appendChild(firstMatchLeftParticipantDiv);
    // parent.appendChild(firstMatchRightParticipantDiv);
    parent.appendChild(firstMatchDiv);
  }

  for (let i = 0; i < firstMatchesNoSeed.length; i++) {
    const firstMatch = firstMatchesNoSeed[i];
    // const firstMatchLeftParticipantDiv = document.createElement("div");
    // const firstMatchRightParticipantDiv = document.createElement("div");
    // firstMatchLeftParticipantDiv.classList.add(
    //   "participant-left",
    //   "mb-1",
    //   "p-1",
    //   "text-center"
    // );
    // firstMatchRightParticipantDiv.classList.add(
    //   "participant-right",
    //   "mb-1",
    //   "p-1",
    //   "text-center"
    // );
    // firstMatchLeftParticipantDiv.innerHTML = firstMatch.leftParticipant;
    // firstMatchRightParticipantDiv.innerHTML = firstMatch.rightParticipant;

    // parent.appendChild(firstMatchLeftParticipantDiv);
    // parent.appendChild(firstMatchRightParticipantDiv);

    const firstMatchDiv = document.createElement("div");
    firstMatchDiv.classList.add(
      "participant-left",
      "mb-1",
      "p-1",
      "text-center"
    );
    firstMatchDiv.innerHTML =
      firstMatch.leftParticipant +
      " : " +
      firstMatch.leftScore +
      "<br>vs<br>" +
      firstMatch.rightParticipant +
      " : " +
      firstMatch.rightScore;
    parent.appendChild(firstMatchDiv);
  }

  // otherMatchesを子供の位置から計算して配置していく
  // for (let i = 0; i < otherMatches.length; i++) {
  //   const otherMatch = otherMatches[i];
  //   const parentMatch = matches.find(
  //     (match) => match.matchId === otherMatch.parentMatchId
  //   );
  //   const parentMatchDiv = parent.querySelector(
  //     `[data-match-id="${parentMatch.matchId}"]`
  //   );
  //   const parentMatchParticipantDiv = document.createElement("div");
  //   const otherMatchDiv = document.createElement("div");
  //   parentMatchParticipantDiv.classList.add("participant", "mb-1", "p-1", "text-center");
  //   otherMatchDiv.classList.add("participant", "mb-1", "p-1", "text-center");
  //   parentMatchParticipantDiv.innerHTML =
  //     parentMatch.leftParticipant || parentMatch.rightParticipant;
  //   otherMatchDiv.innerHTML =
  //     otherMatch.leftParticipant || otherMatch.rightParticipant;

  //   parentMatchDiv.appendChild(parentMatchParticipantDiv);
  //   parentMatchDiv.appendChild(otherMatchDiv);
  // }
}
