var $ = require('jquery');
var sceneInterface = require('./interfaces/sceneInterface');
var resolver = require('./lib/Resolver');

var Engine = function(game) {

	var self = this;
	var progress = {};

	this.sceneManager = {};

	this.start = function() {
		game.init();
		initScene();
	};

	var initScene = function() {
		self.currentScene = resolver.resolve(game.getScene());
		self.currentScene.init();
	};
};

module.exports = Engine;