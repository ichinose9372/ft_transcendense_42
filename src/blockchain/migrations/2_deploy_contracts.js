const TournamentScore = artifacts.require("TournamentScore");

module.exports = function (deployer) {
	deployer.deploy(TournamentScore);
};