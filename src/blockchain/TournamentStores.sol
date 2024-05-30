// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TournamentScore {
    struct Score {
        string matchId;
        string scorerName;
        uint256 score;
    }

    Score[] public scores;

    function addScore(
        string calldata tournamentId,
        string calldata playerId,
        uint256 score
    ) public {
        scores.push(Score(tournamentId, playerId, score));
    }

    function getScore(
        uint256 index
    ) public view returns (string memory, string memory, uint256) {
        Score storage s = scores[index];
        return (s.matchId, s.scorerName, s.score);
    }
}
