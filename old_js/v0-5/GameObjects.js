var container = require('./data/ClassContainer');
var sceneList = require('../game/data/sceneList');
var helpers = require('./helpers');

var GameObjects = {

	gameObjectsList: {},

	init: function() {
		this.gameObjectsList = helpers.extend(container, sceneList);
	},

	get: function(objId) {
		var obj = this.getObj(objId);
		var func = obj[1];
		var depNames = obj[0].split(",");
		var depArray = this.resolveDependencies(depNames);
		return new func(depArray);
	},

	getObj: function(objId) {
		return this.gameObjectsList[objId];
	},

	resolveDependencies: function(deps) {
		var d = 0;
		var dependencies = []
;
		for(; d < deps.length; d++) {
			if(typeof this.gameObjectsList[deps[d]] !== "undefiend") {
				dependencies.push(this.gameObjectsList[deps[d]]);
			}
			else {
				var noop = function() {};
				dependencies.push(noop);
			}
		};

		return dependencies;
	}
};

module.exports = GameObjects;