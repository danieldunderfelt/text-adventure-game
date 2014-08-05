var _ = require('lodash');

var IntroScene = function(paths, items, interactions, characters, content, view, controller) {
	this.paths = paths;
	this.items = items;
	this.interactions = interactions;
	this.characters = characters;
	this.content = content;
	this.view = view;
	this.game = controller;

	this.renderedCallback = _.bind(this.renderedCallback, this);
};

IntroScene.prototype = {

	constructor: IntroScene,

	start: function(state) {
		this.view.render(this.content[state.content][state.position], this.renderedCallback);
	},

	renderedCallback: function(response) {
		var state = this.game.model.setSceneState("current", {position: "increment"});
		var storyLength = this.content[state.content].length;

		if(state.position >= storyLength) {
			this.paths.next.activate();
		}
	},

	play: function(state) {
		this.view.render(this.content[state.content][state.position], this.renderedCallback);
	}
};

module.exports = IntroScene;
