var output = require('../screenrenderer');

var baseRoom = function() {

	var self = this;

	this.print = function(content) {
		output.renderSequence(content);
	};
};

module.exports = baseRoom;