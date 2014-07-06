var $ = require('jquery');
var game = require('../game/GameController');
var resolver = require('./lib/SceneResolver');
var viewLoader = require('./lib/ViewLoader');
var input = require('./input/InputController');

var Engine = {
	currentScene: {},

	start: function() {
		resolver.init();
		this.initScene();
	},

	initScene: function() {
		var scene = resolver.get(game.getScene());
		this.currentScene = new scene(viewLoader, input).init();
	}
};

module.exports = Engine;