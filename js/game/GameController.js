var GameController = {

	saveData: {},

	init: function(initData) {
		this.saveData = initData;
		return this;
	},

	getScene: function() {
		return this.saveData.currentScene;
	},
};

module.exports = GameController;