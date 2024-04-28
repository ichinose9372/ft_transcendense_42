class Participant {
  constructor(name) {
    this.participantId = self.crypto.randomUUID();
    this.participantName = name;
  }

  getParticipantId() {
    return this.participantId;
  }
  getParticipantName() {
    return this.participantName;
  }
}

class Match {
  constructor() {
    this.matchId = self.crypto.randomUUID();
    this.leftParticipant = "";
    this.rightParticipant = "";
    this.leftScore = 0;
    this.rightScore = 0;
    this.finishedTimestamp = "";
    this.parentMatchId = 0;
    this.tournamentId = "";
  }
  getMatchId() {
    return this.matchId;
  }
  getLeftParticipant() {
    return this.leftParticipant;
  }
  getRightParticipant() {
    return this.rightParticipant;
  }
  getLeftScore() {
    return this.leftScore;
  }
  getRightScore() {
    return this.rightScore;
  }
  getFinishedTimestamp() {
    return this.finishedTimestamp;
  }
  getParentMatchId() {
    return this.parentMatchId;
  }
  getTournamentId() {
    return this.tournamentId;
  }

  getWinner() {
    if (this.leftScore > this.rightScore) {
      return this.leftParticipant;
    } else {
      return this.rightParticipant;
    }
  }
  getLoser() {
    if (this.leftScore < this.rightScore) {
      return this.leftParticipant;
    } else {
      return this.rightParticipant;
    }
  }
}

class Tournament {
  constructor(tournamentName) {
    this.tournamentId = self.crypto.randomUUID();
    this.tournamentName = tournamentName;
  }

  getTournamentId() {
    return this.tournamentId;
  }
  getTournamentName() {
    return this.tournamentName;
  }
}
