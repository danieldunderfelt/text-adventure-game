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

	setCurrentScene: function(sceneId) {
		this.state.currentScene = sceneId;
		return sceneId;
	},

	getSceneData: function(scene) {
		if(scene === "current") {
			scene = this.state.currentScene;
		}
		return scenemap[scene];
	}
};

module.exports = GameModel;