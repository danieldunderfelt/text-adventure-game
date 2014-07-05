var output = require('../lib/screenrenderer');

var baseRoom = function() {

	var self = this;

	this.print = function(content, dynamicContent) {
		output.renderSequence(content, dynamicContent);
	};

	this.printSimple = function(content) {
		output.renderSimple(content);
	}
};

module.exports = baseRoom;