const { v4: uuidv4 } = require("uuid");
const { Match, Participant, Tournament } = require("./class.js");

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

module.exports = { makeMatch };
