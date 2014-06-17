var $ = require('jquery');
var output = require('./screenrenderer');
var gameActions = require('./gameactions');
var defaultData = require('./data/gameData');
var progress = require('./progress');
var input = require('./input');
var roomManager = require('./roomManager');

var Game = function(app) {

	var self = this;

	this.gameData = {};
	this.inputActive = false;
	this.previousCommands = [];
	this.gameActions = new gameActions(this);
	this.input = new input(this);
	this.roomManager = new roomManager(this);

	this.app = app;

	this.init = function() {
		doStartScreen();
		self.input.init();
	};

	this.loadProgress = function() {
		var gameSave = progress.load();
		
		if(gameSave === false) {
			self.gameData = defaultData;
		}
		else {
			self.gameData = gameSave;
		}

		loadGame();
	};

	this.showHelp = function() {
		console.log("help");
	};

	this.doError = function() {
		output.renderSimple(self.currentRoom.content.commandError);
	};

	var doStartScreen = function() {
		self.roomManager.loadRoom("mainmenu");
	};
};

module.exports = Game;