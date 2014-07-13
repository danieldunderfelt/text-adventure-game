var resolver = require('./ClassResolver');

var SceneLoader = {

	load: function(sceneName, data) {
		console.log(resolver); // Object {} ????
		var scene = resolver.get(sceneName);
		// get seems to be undefined ????
		var sceneInst = new scene(
			this.loadPaths(data.paths),
			this.loadItems(data.items),
			this.loadInteractions(data.interactions),
			this.loadCharacters(data.characters),
			data.data.content,
			this.loadView(data.view)
		);

		return sceneInst;
	},

	loadPaths: function(data) {
		if(data === null) {
			return null;
		}
	},
	loadItems: function(data) {

	},
	loadInteractions: function(data) {

	},
	loadCharacters: function(data) {

	},
	loadView: function(data) {

	}
};

module.exports = SceneLoader;