var gameActions = function(game) {

	this.newGame = function() {
		console.log("New game");
	};

	this.loadGame = function() {
		console.log("game loaded");
	};

	this.saveGame = function() {
		console.log("game saved");
	};

	this.showHelp = function() {
		game.showHelp();
	};
};

module.exports = gameActions;