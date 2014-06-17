var $ = require('jquery');
var commandParser = require('./commandParser');

var Input = function(game) {

	var self = this;
	var $input;

	this.parser = {};
	this.inputHandler;

	this.init = function() {
		$input = $("#input");
		self.inputHandler = self.receiveInput;
		startListeners();
	};

	this.deferInput = function(deferTo) {
		self.inputHandler = deferTo;
	};

	this.cleanInput = function() {
		$input.val("");
	};

	var startListeners = function() {
		$(window).on("keyup", getInput);
	};

	var getInput = function(e) {
		if(e.keyCode === 13) {
			var input = $input.val();
			self.inputHandler(input);
		}
	};

	this.receiveInput = function(input) {
		self.parser = new commandParser(game.roomManager.currentRoom.commands);
		var parsedCommand = self.parser.parse(input);
		
		if(parsedCommand !== false) {
			game.doCommand(parsedCommand);
		}
		else {
			game.doError();
		}
	};
};

module.exports = Input;