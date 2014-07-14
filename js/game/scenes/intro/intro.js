var _ = require('lodash');

var IntroScene = function(paths, items, interactions, characters, data, view) {
	this.paths = paths;
	this.items = items;
	this.interactions = interactions;
	this.characters = characters;
	this.data = data;
	this.view = view;

	this.renderedCallback = _.bind(this.renderedCallback, this);
};

IntroScene.prototype = {

	constructor: IntroScene,

	start: function() {
		this.view.render(this.data.content[this.data.state.content][0], this.renderedCallback);
	},

	renderedCallback: function(response) {
		this.data.state.position++;
		var storyLength = this.data.content[this.data.state.content].length;

		if(this.data.state.position >= storyLength) {
			this.paths.next.activate();
		}
	},

	play: function(state) {
		this.view.render(this.data.content[this.data.state.content][this.data.state.position], this.renderedCallback);
	}
};

module.exports = IntroScene;
