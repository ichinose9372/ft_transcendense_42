const { v4: uuidv4 } = require("uuid");
const { makeMatch } = require("./makeMatch.js");
const { assignTournament, findMostChildMatches } = require("./assignTournament.js");
const { Match, Participant } = require("./class.js");

describe("frontend tests", () => {
  for (let i = 2; i <= 15; i++) {
    test(`makeMatch with ${i} participants`, () => {
      const participants_length = i;
      const matchArray = [];
      const tournamentId = uuidv4();
      const count = 0;
      makeMatch(participants_length, matchArray, "", tournamentId, count);
      // console.log(matchArray);
      expect(matchArray.length).toBe(participants_length - 1);
    });
  }

  for (let i = 2; i <= 15; i++) {
    test(`assign tournament with ${i} participants`, () => {
      const participants_length = i;
      const matchArray = [];
      const tournamentId = uuidv4();
      const count = 0;
      makeMatch(participants_length, matchArray, "", tournamentId, count);
      const participantArray = [];
      for (let i = 0; i < participants_length; i++) {
        participantArray.push({ name: `participant${i}` });
      }
      assignTournament(matchArray, participantArray);
      const mostChildMatches = findMostChildMatches(matchArray);
      // mostChildMatchesの中に全ての参加者が割り当てられているか確認
      for (const match of mostChildMatches) {
        expect(match.leftParticipant).not.toBe("");
        expect(match.leftParticipant).not.toBe(undefined);
        expect(match.rightParticipant).not.toBe("");
        expect(match.rightParticipant).not.toBe(undefined);

      }
      // participantArrayに余っている参加者がいないか確認
      expect(participantArray.length).toBe(0);
      // console.log(matchArray);
    });
  }
});
