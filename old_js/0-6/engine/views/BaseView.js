var $ = require('jquery');
var StringReplace = require('../lib/StringReplace');

var BaseView = function($screen) {
	this.$screen = $screen;
};

BaseView.prototype = {

	renderSimple: function(text, color, effect, callback) {
		this.render(text, color, effect, callback);
	},

	renderSequence: function(textArray, dynamicData, effect, callback) {
		var counter = 0;
		var content = textArray;
		var self = this;

		if(typeof dynamicData !== "undefined" && dynamicData !== null) {
			content = StringReplace.put(dynamicData, textArray);
		}

		function next() {
			if(counter < textArray.length) {
				self.render(content[counter], null, effect);
				counter++;
				setTimeout(next, 0);
			}
		}

		next();
	},

	render: function(text, color, effect, callback) {
		color = color === null ? "white" : color;

		if(text instanceof Array) {
			color = text[1];
			text = text[0];
		}

		var $text = $("<p style='color: "+ color +";'>" + text + "</p>");
		this.renderEffects[effect]($text, $(this.$screen), callback);
	},

	renderEffects: {

		fade: function($text, $screen, callback) {
			$text.css("display", "none");
			$screen.append($text);
			$text.fadeIn(1000, callback);
		}
	}
};

module.exports = BaseView;