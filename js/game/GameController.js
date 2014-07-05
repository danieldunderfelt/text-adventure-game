var sceneList = require('./data/sceneList');

var GameController = function(initData) {

	var self = this;
	this.saveData = initData;

	this.init = function() {

	};

	this.getScene = function() {
		return sceneList[self.saveData.currentScene];
	};
};

module.exports = GameController;