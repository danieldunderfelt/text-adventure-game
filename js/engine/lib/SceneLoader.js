var resolver = require('./SceneResolver');
var ViewLoader = require('./ViewLoader');

var SceneLoader = {

	interface: function() {},

	init: function(objects) {
		resolver.init(objects);
	},

	load: function(sceneName, data, interface) {
		this.interface = interface;
		var scene = resolver.get(sceneName);
		var sceneInst = new scene(
			this.loadObjects(data.paths, "path"),
			this.loadObjects(data.items, "item"),
			this.loadObjects(data.interactions, "interaction"),
			this.loadObjects(data.characters, "character"),
			data.data,
			this.loadView(data.view)
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