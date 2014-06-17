var $ = require('jquery');
var output = require('./screenrenderer');
var gameActions = require('./gameactions');
var defaultData = require('./data/gameData');
var progress = require('./progress');
var input = require('./input');
var roomManager = require('./roomManager');

var Game = function(app) {

	var self = this;

	this.gameData = defaultData;
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

	this.newGame = function() {
		self.gameData.currentRoom.roomId = "create_char";
		self.roomManager.loadRoom(self.gameData.currentRoom.roomId);
	};

	this.loadGame = function() {
		
	};

	var loadProgress = function() {
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
		output.renderSimple(self.roomManager.currentRoom.content.commandError);
	};

	this.receiveData = function(data, toObject) {

	};

	this.doCommand = function(commandData) {
		var action;

		if(commandData.scope === "game") {
			action = self.gameActions[commandData.action];
		}
		else if(commandData.scope === "room") {
			action = self.roomManager.currentRoom[commandData.action];
		}

		if(typeof action === "undefined") {
			self.doError();
		}
		else {
			commandActions(action, commandData.fullCommand);
		}
	};

	var commandActions = function(action, command) {
		output.echoCommand(command);
		self.input.cleanInput();
		self.previousCommands.push(command);
		action(command);
	};

	var doStartScreen = function() {
		self.roomManager.loadRoom("main_menu");
	};
};

module.exports = Game;