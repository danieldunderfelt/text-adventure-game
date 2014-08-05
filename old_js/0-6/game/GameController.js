var $ = require('jquery');
var _ = require('lodash');
var engine = require('../engine/engine');
var scenelist = require('./data/sceneList');
var objectslist = require('./data/objectsList');
var helpers = require('../helpers');
var model = require('./models/GameModel');

var GameController = function(saveData) {
	this.model = new model(saveData);
	this.loadNewScene = _.bind(this.loadNewScene, this);
};

GameController.prototype = {
	constructor: GameController,
	currentScene: {},
	currentUI: {},

	start: function() {
		var gameObjects = _.merge({}, scenelist, objectslist);
		engine.sceneLoader.init(gameObjects);
		this.model.init();
		this.newScene();
	},

	newScene: function() {
		this.loadNewUI();
	},

	loadNewUI: function() {
		var newUI = this.model.getCurrentUI();

		this.currentUI = engine.uiLoader.load(
			newUI.html,
			newUI.container,
			this.loadNewScene
		);
	},

	loadNewScene: function() {
		var sceneName = this.model.getCurrentScene();

		this.currentScene = engine.sceneLoader.load(
			sceneName,
			this.model.getSceneData("current"),
			this,
			this.gameObjectInterface
		);

		this.currentScene.start(this.model.getSceneState("current"));
	},

	gameObjectInterface: function(caller, argument) {

	}
};

module.exports = GameController;