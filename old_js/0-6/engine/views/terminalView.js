var $ = require('jquery');

var TerminalView = function() {

	var self = this;

	this.echoCommand = function(command) {
		if(command instanceof Array) {
			command = command.join(" ");
		}
		render(">> " + command, "lime");
	};

	var render = function(text, color) {
		color = color || "white";

		if(text instanceof Array) {
			color = text[1];
			text = text[0];
		}

		var $text = $("<p style='color: "+ color +";'>" + text + "</p>");
		$("#screen").append($text);
	};
};

module.exports = TerminalView;