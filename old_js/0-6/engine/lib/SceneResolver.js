var _ = require('lodash');

var SceneResolver = {

	gameObjectsList: {},

	init: function(objects) {
		_.merge(this.gameObjectsList, objects);
	},

	get: function(classId) {
		return this.gameObjectsList[classId];
	}
};

module.exports = SceneResolver;