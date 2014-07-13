var container = require('../ClassContainer');
var _ = require('lodash');

var ClassResolver = {

	gameObjectsList: {},

	init: function(objects) {
		_.merge(this.gameObjectsList, container, objects);
	},

	get: function(classId) {
		return this.gameObjectsList[classId];
	}
};

module.exports = ClassResolver;