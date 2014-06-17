var output = require('../screenrenderer');

var baseRoom = function() {

	var self = this;

	this.showContent = function(content) {
		output.renderSequence(content);
	};
};

module.exports = baseRoom;