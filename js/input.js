var $ = require('jquery');
var commandParser = require('./commandParser');

var Input = function(game) {

	var self = this;
	var $input;

	this.parser = {};

	this.init = function() {
		$input = $("#input");
		startListeners();
	};

	var startListeners = function() {
		$(window).on("keyup", getInput);
	};

	var getInput = function(e) {
		if(e.keyCode === 13) {
			var input = $input.val();
			receiveInput(input);
		}
	};

	var receiveInput = function(input) {
		self.parser = new commandParser(game.currentRoom.commands);
		var parsedCommand = self.parser.parse(input);
		
		if(parsedCommand !== false) {
			doCommand(parsedCommand);
		}
		else {
			doError();
		}
	};

	var doCommand = function(commandData) {
		var action;

		if(commandData.scope === "game") {
			action = game.gameActions[commandData.action];
		}
		else if(commandData.scope === "room") {
			action = game.currentRoom[commandData.action];
		}

		if(typeof action === "undefined") {
			doError();
		}
		else {
			commandActions(action, commandData.fullCommand);
		}
	};

	var commandActions = function(action, command) {
		$input.val("");
		game.previousCommands.push(command);
		action(command);
	};
};

module.exports = Input;