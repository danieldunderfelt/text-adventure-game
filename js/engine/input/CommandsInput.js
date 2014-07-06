var $ = require('jquery');

var CommandsInput = function() {
	this.$input;
	this.handler;
};

CommandsInput.prototype = {

	constructor: CommandsInput,

	init: function(inputUI, handler) {
		this.$input = $(inputUI);
		this.handler = handler;
		this.startListeners();
	},

	cleanInput: function() {
		this.$input.val("");
	},

	getInput: function(e) {
		if(e.keyCode === 13) {
			var input = this.$input.val();
			commandHandler(input);
		}
	},

	startListeners: function() {
		$(window).on("keydown.CommandsInput", this.getInput);
	}
};

module.exports = CommandsInput;