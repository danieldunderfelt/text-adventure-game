var resolver = require('./lib/ClassResolver');

var Engine = {

	input: {},
	ui: {},
	view: {},
	scene: {},

	init: function(gameObjects) {
		resolver.init(gameObjects);

		this.input = resolver.get("input");
		this.ui = resolver.get("uiLoader");
		this.view = resolver.get("viewLoader");
		this.scene = resolver.get("sceneLoader");
	},

	get: function(id) {
		return resolver.get(id);
	}

};

module.exports = Engine;