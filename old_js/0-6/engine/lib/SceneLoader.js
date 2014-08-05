var resolver = require('./SceneResolver');
var ViewLoader = require('./ViewLoader');

var SceneLoader = {

	interface: function() {},

	init: function(objects) {
		resolver.init(objects);
	},

	load: function(sceneName, data, game, interface) {
		this.interface = interface;
		var scene = resolver.get(sceneName);
		var sceneInst = new scene(
			this.loadObjects(data.paths, "path"),
			this.loadObjects(data.items, "item"),
			this.loadObjects(data.interactions, "interaction"),
			this.loadObjects(data.characters, "character"),
			data.data.content,
			this.loadView(data.view),
			game
		);

		return sceneInst;
	},

	loadObjects: function(data, type) {
		if(data === null) {
			return null;
		}

		var objects = {};
		var obj = 0;
		var props = Object.keys(data);

		for(obj; obj < props.length; obj++) {
			var sceneObj;

			if(!data[props[obj]] instanceof Boolean) {
				var objClass = resolver.get(data[props[obj]]);
				sceneObj = new objClass(this.interface);
			}
			else {
				sceneObj = data[props[obj]];
			}

			objects[props[obj]] = sceneObj;
		}

		return objects;
	},

	loadView: function(data) {
		return ViewLoader.load(data.view, data.screen);
	}
};

module.exports = SceneLoader;