var $ = require('jquery');

var ScreenRenderer = function() {

	var self = this;

	this.renderSimple = function(text) {
		render(text);
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
		if(typeof command === "array") {
			command = command.join(" ");
		}
		render(">> " + command, "lime");
	};

	var render = function(text, color) {
		color = color || "white";
		var $text = $("<p style='color: "+ color +";'>" + text + "</p>");
		$("#screen").append($text);
	};
};

module.exports = new ScreenRenderer();