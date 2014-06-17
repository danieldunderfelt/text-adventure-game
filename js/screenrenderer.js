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

	var render = function(text) {
		var $text = $("<P>" + text + "</p>");
		$("#screen").append($text);
	};
};

module.exports = new ScreenRenderer();