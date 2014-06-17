var $ = require('jquery');
var game = require('./game');

var Application = function() {

	var self = this;

	this.currentGame = {};
	
	this.init = function() {
		self.currentGame = new game(self);
		self.currentGame.init();
	};
};

module.exports = Application;