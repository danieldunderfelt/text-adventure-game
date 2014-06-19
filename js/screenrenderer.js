var $ = require('jquery');

var ScreenRenderer = function() {

	var self = this;

	this.renderSimple = function(text, color) {
		render(text, color);
	};

	this.renderSequence = function(textArray) {
		var counter = 0;
		
		function next() {
			if(counter < textArray.length) {
				render(textArray[counter]);
				counter++;
				setTimeout(next, 400);
			}
		}

		next();
	};

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

module.exports = new ScreenRenderer();