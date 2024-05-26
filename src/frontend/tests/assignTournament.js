function findMostChildMatches(matches) {
  // 親IDのセットを作成
  const parentIds = new Set(matches.map((match) => match.parentMatchId));

  // 親として一度も参照されていないマッチを返す
  return matches.filter((match) => !parentIds.has(match.matchId));
}

function countParentMatches(matches, matchId) {
	const parentMatchIds = matches.map((match) => match.parentMatchId);
	return parentMatchIds.filter((parentMatchId) => parentMatchId === matchId).length;
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
	// １回しか呼ばれていない親に対して、出場者を割り当てる
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

module.exports = { assignTournament, findMostChildMatches };
