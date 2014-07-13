var $ = require('jquery');
var engine = require('../engine/engine');
var scenelist = require('./data/sceneList');
var objectslist = require('./data/objectsList');
var helpers = require('../helpers');
var model = require('./models/GameModel');
var resolver = require('../engine/lib/ClassResolver');

var GameController = function(saveData) {
	this.model = new model(saveData);
};

GameController.prototype = {
	constructor: GameController,
	currentScene: {},

	start: function() {
		var gameObjects = $.extend({}, scenelist, objectslist);
		engine.init(gameObjects);
		this.model.init();
		this.newScene();
	},

	newScene: function() {
		console.log(resolver);
		var sceneName = this.model.getCurrentScene();
		this.currentScene = engine.scene.load(
			sceneName,
			this.model.getSceneData("current")
		);
		console.log(this.currentScene);
	}
};

module.exports = GameController;