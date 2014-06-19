var output = require('../screenrenderer');

var baseRoom = function() {

	var self = this;

	this.print = function(content, dynamicContent) {
		var printContent = content;

		if(typeof dynamicContent !== "undefined") {
			printContent = prepareContent(content, dynamicContent);
		}

		output.renderSequence(printContent);
	};

	this.printSimple = function(content) {
		output.renderSimple(content);
	}

	var prepareContent = function(content, dynamicContent) {
		var re = /(:[0-9]*)/ig;
		for(var c = 0; c < content.length; c++) {
			var test = content[c].match(re);

			if(test !== null) {
				for(var d = 0; d < test.length; d++) {
					var dynIndex = parseInt(test[d].replace(":", ""), 10);
					content[c] = content[c].replace(test[d], dynamicContent[dynIndex - 1]);
				}
			}
		}

		return content;
	};
};

module.exports = baseRoom;