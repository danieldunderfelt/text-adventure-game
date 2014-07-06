var $ = require('jquery');

var BaseView = function($screen) {
	this.$screen = $screen;
};

BaseView.prototype = {

	renderSimple: function(text, color, effect) {
		this.render(text, color, effect);
	},

	renderSequence: function(textArray, dynamicData, effect) {
		var counter = 0;
		var content = textArray;
		var self = this;

		if(typeof dynamicData !== "undefined" && dynamicData !== null) {
			content = this.prepareContent(textArray, dynamicData);
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

	prepareContent: function(content, dynamicContent) {
		var re = /(:[0-9])/ig;
		for(var c = 0; c < content.length; c++) {
			var test;
			var contentIsArray = false;

			if(content[c] instanceof Array) {
				test = content[c][0].match(re);
				contentIsArray = true;
			}
			else if (typeof content[c] ===  "string") {
				test = content[c].match(re);
			}
			else {
				throw "Content must be array or string.";
			}

			if(test !== null) {
				for(var d = 0; d < test.length; d++) {
					var dynIndex = parseInt(test[d].replace(":", ""), 10);
					var preparedContent;
					var replacement = dynamicContent[dynIndex - 1];

					if(contentIsArray === true) {
						preparedContent = content[c][0].replace(test[d], replacement);
						content[c][0] = preparedContent;
					}
					else {
						preparedContent = content[c].replace(test[d], replacement);
						content[c] = preparedContent;
					}
				}
			}
		}

		return content;
	},

	render: function(text, color, effect) {
		color = color === null ? "white" : color;

		if(text instanceof Array) {
			color = text[1];
			text = text[0];
		}

		var $text = $("<p style='color: "+ color +";'>" + text + "</p>");
		this.renderEffects[effect]($text, $(this.$screen));
	},

	renderEffects: {

		fade: function($text, $screen) {
			$text.css("display", "none");
			$screen.append($text);
			$text.fadeIn(1000);
		}
	}
};

module.exports = BaseView;