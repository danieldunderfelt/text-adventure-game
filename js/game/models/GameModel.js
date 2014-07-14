var data = require('../data/global');
var scenemap = require('../data/sceneMap');
var _ = require('lodash');

var GameModel = function(saveData) {
	this.saveData = saveData;
	this.data = data;
	this.state;
};

GameModel.prototype = {
	constructor: GameModel,

	init: function() {
		this.state = _.merge(this.data, this.saveData);
	},

	getCurrentScene: function() {
		return this.state.currentScene;
	},

	getCurrentUI: function() {
		var sceneName = this.getCurrentScene();
		return scenemap[sceneName].view;
	},

	setCurrentScene: function(sceneId) {
		this.state.currentScene = sceneId;
		return sceneId;
	},

	getSceneData: function(scene) {
		if(scene === "current") {
			scene = this.state.currentScene;
		}
		return scenemap[scene];
	},

	getSceneState: function(scene) {
		if(scene === "current") {
			scene = this.state.currentScene;
		}
		return scenemap[scene].state;
	},

	setSceneState: function(scene, values) {
		if(scene === "current") {
			scene = this.state.currentScene;
		}
		_.merge(scenemap[scene].state, values, this.stateFuncs, this);
		return scenemap[scene].state;
	},

	stateFuncs: function(oldVal, newVal) {
		var setVal;

		switch(newVal) {
			case "increment":
				setVal = oldVal + 1;
				break;
			case "decrement":
				setVal = oldVal - 1;
				break;
			default:
				setVal = newVal;
				break;
		}

		return setVal;
	}
};

module.exports = GameModel;