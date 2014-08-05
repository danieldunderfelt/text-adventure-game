var $ = require('jquery');
var _ = require('lodash');
var engine = require('../engine/Engine');
/*
var scenelist = require('./data/sceneList');
var objectslist = require('./data/objectsList');
var helpers = require('../helpers');
var model = require('./models/GameModel');
*/

class GameController {

	constructor(saveData) {
		//this.model = new model(saveData);
		this.loadNewScene = _.bind(this.loadNewScene, this);
		this.currentScene = {};
		this.currentUI = {};
	}

	start() {
		var gameObjects = _.merge({} scenelist, objectslist);
		engine.sceneLoader.init(gameObjects);
		this.model.init();
		this.newScene();
	}

	newScene() {
		this.loadNewUI();
	}

	loadNewUI() {
		var newUI = this.model.getCurrentUI();

		this.currentUI = engine.uiLoader.load(
			newUI.html,
			newUI.container,
			this.loadNewScene
		);
	}

	loadNewScene() {
		var sceneName = this.model.getCurrentScene();

		this.currentScene = engine.sceneLoader.load(
			sceneName,
			this.model.getSceneData("current"),
			this,
			this.gameObjectInterface
		);

		this.currentScene.start(this.model.getSceneState("current"));
	}
}

module.exports = GameController;