// 配列をシャッフルする関数
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function makeMatch(
  participants_length,
  matchArray,
  parentMatchId = "",
  tournamentId,
  count = 0
) {
  if (participants_length < 2) {
    return;
  } else if (participants_length > 3) {
    const newMatch = new Match(parentMatchId, tournamentId);
    matchArray.push(newMatch);
    const newMatchId = newMatch.getMatchId();
    const leftParticipants = Math.ceil(participants_length / 2);
    const rightParticipants = Math.floor(participants_length / 2);

    makeMatch(
      leftParticipants,
      matchArray,
      newMatchId,
      tournamentId,
      count + 1
    );
    makeMatch(
      rightParticipants,
      matchArray,
      newMatchId,
      tournamentId,
      count + 1
    );
  } else if (participants_length === 3 || participants_length === 2) {
    const newMatch = new Match(parentMatchId, tournamentId);
    matchArray.push(newMatch);
    if (participants_length === 3) {
      parentMatchId = newMatch.getMatchId();
      matchArray.push(new Match(parentMatchId, tournamentId));
    }
  }
}

function findMostChildMatches(matches) {
  // 親IDのセットを作成
  const parentIds = new Set(matches.map((match) => match.parentMatchId));

  // 親として一度も参照されていないマッチを返す
  return matches.filter((match) => !parentIds.has(match.matchId));
}

function countParentMatches(matches, matchId) {
  const parentMatchIds = matches.map((match) => match.parentMatchId);
  return parentMatchIds.filter((parentMatchId) => parentMatchId === matchId)
    .length;
}

function assignTournament(matchArray, participantArray) {
  const mostChildMatches = findMostChildMatches(matchArray);

  // mostChildMatchesの中に含まれるマッチに対して、出場者を割り当てる
  for (const match of mostChildMatches) {
    const leftParticipant = participantArray.shift();
    const rightParticipant = participantArray.shift();
    const matchId = match.getMatchId();
    matchArray
      .filter((match) => match.getMatchId() === matchId)
      .forEach((match) => {
        match.leftParticipant = leftParticipant.name;
        match.rightParticipant = rightParticipant.name;
      });
  }

  // 出場者が余っている場合、mostChildMatchesの親に対して順に割り当てる
  if (participantArray.length > 0) {
    for (const match of mostChildMatches) {
      if (participantArray.length === 0) {
        break;
      }
      const parentMatchId = match.getParentMatchId();
      const parentMatchCount = countParentMatches(matchArray, parentMatchId);
      if (parentMatchCount > 1) {
        continue;
      }
      const leftParticipant = participantArray.shift();
      matchArray
        .filter((match) => match.getMatchId() === parentMatchId)
        .forEach((match) => {
          match.leftParticipant = leftParticipant.name;
        });
    }
  }
}

function makeTournament() {
  const tournament = appState.getStateByKey("tournament");
  const participants = appState.getStateByKey("participants");

  // 出場者をランダムに並び替える
  const shuffledParticipants = shuffleArray(participants);
  const participantArray = shuffledParticipants.map((participant) => {
    return { name: participant.name };
  });

  // tournamentクラスのインスタンスを生成
  const tournamentInstance = new Tournament(tournament.name);

  // 試合を生成
  const matchArray = [];
  makeMatch(
    participantArray.length,
    matchArray,
    "",
    tournamentInstance.getTournamentId(),
    0
  );

  // participantArrayの深いコピーを作成
  const copiedParticipantArray = participantArray.map((participant) => {
    return new Participant(participant.name);
  });
  // トーナメントに出場者を割り当てる
  assignTournament(matchArray, participantArray);
  return {
    tournament: tournamentInstance,
    participants: copiedParticipantArray,
    matches: matchArray,
  };
}
