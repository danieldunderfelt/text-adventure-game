var container = require('../data/ClassContainer');
var sceneList = require('../../game/data/sceneList');
var helpers = require('../helpers');

var SceneResolver = {

	gameObjectsList: {},

	init: function() {
		this.gameObjectsList = helpers.extend(container, sceneList);
	},

	get: function(sceneId) {
		return this.gameObjectsList[sceneId];
	}
};

module.exports = SceneResolver;