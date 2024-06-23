// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TournamentScore {
    struct Score {
        string matchId;
        string scorerName;
        uint256 score;
    }

    Score[] public scores;

    function addScores(Score[] calldata scoreInputs) public {
        for (uint i = 0; i < scoreInputs.length; i++) {
            scores.push(scoreInputs[i]);
        }
    }

    function getScores() public view returns (Score[] memory) {
        return _getScores();
    }

    function _getScores() internal view returns (Score[] memory) {
        return scores;
    }
}
