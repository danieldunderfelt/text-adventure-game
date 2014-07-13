var IntroScene = function(paths, items, interactions, characters, content, view) {
	this.paths = paths;
	this.items = items;
	this.interactions = interactions;
	this.characters = characters;
	this.content = content;
	this.view = view;
};

IntroScene.prototype = {

	constructor: IntroScene,

	start: function(state) {
		this.view.display(this.content.start[0]);
	},

	play: function(state) {
		this.view.display(this.content[state.content][state.position]);
	}
};

module.exports = IntroScene;
