var $ = require('jquery');

var ScreenRenderer = function() {

	var self = this;

	this.renderSimple = function(text, color) {
		render(text, color);
	};

	this.renderSequence = function(textArray, dynamicData) {
		var counter = 0;
		var content = textArray;

		if(typeof dynamicData !== "undefined") {
			content = prepareContent(textArray, dynamicData);
		}
		
		function next() {
			if(counter < textArray.length) {
				render(content[counter]);
				counter++;
				setTimeout(next, 0);
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

	var prepareContent = function(content, dynamicContent) {
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
					console.log(replacement, dynamicContent);
					
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
	};
};

module.exports = new ScreenRenderer();