var SceneModel = function() {};

SceneModel.prototype = {
	constructor: SceneModel,

	getConfig: function(key) {
		return this.data[key];
	},
	getContent: function(key) {
		return this.data.content[key];
	},
};

module.exports = SceneModel;