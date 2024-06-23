class Participant {
  constructor(participantName, participantId = self.crypto.randomUUID()) {
    this.participantId = participantId;
    this.participantName = participantName;
  }

  getParticipantId() {
    return this.participantId;
  }
  getParticipantName() {
    return this.participantName;
  }
}

class Match {
  constructor(parentMatchId, tournamentId) {
    this.matchId = self.crypto.randomUUID();
    this.leftParticipant = "";
    this.rightParticipant = "";
    this.leftScore = 0;
    this.rightScore = 0;
    this.finishedTimestamp = "";
    this.parentMatchId = parentMatchId;
    this.tournamentId = tournamentId;
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
    } else if (this.leftScore === this.rightScore) {
      return "";
    } else {
      return this.rightParticipant;
    }
  }
  getLoser() {
    if (this.leftScore < this.rightScore) {
      return this.leftParticipant;
    } else if (this.leftScore === this.rightScore) {
      return "";
    } else {
      return this.rightParticipant;
    }
  }

  isSeedMatch() {
    return this.rightParticipant === "" || this.leftParticipant === "";
  }

  isFinished() {
    return this.finishedTimestamp !== "";
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
