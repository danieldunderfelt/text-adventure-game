var $ = require('jquery');

var CommandsInput = function(inputElement, commandHandler) {

	var self = this;
	this.$input = $("#" + inputElement);

	this.init = function() {
		startListeners();
	};

	this.cleanInput = function() {
		self.$input.val("");
	};

	this.getInput = function(e) {
		if(e.keyCode === 13) {
			var input = self.$input.val();
			commandHandler(input);
		}
	};

	var startListeners = function() {
		$(window).on("keydown.CommandsInput", self.getInput);
	};
};

module.exports = CommandsInput;