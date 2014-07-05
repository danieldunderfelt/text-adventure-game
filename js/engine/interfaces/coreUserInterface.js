var gameActions = function(game) {

	this.newGame = function() {
		game.newGame();
	};

	this.loadGame = function() {
		game.loadGame();
	};

	this.saveGame = function() {
		console.log("game saved");
	};

	this.showHelp = function() {
		game.showHelp();
	};
};

module.exports = gameActions;