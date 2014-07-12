var model = require('./IntroModel');
var helpers = require('../../../helpers');

var IntroScene = function(viewLoader, input) {

	this.viewLoader = viewLoader;
	this.view;
	this.input = input;
	this.model = new model();

	this.play = helpers.scope(this.play, this);
	this.nextScene = helpers.scope(this.nextScene, this);
};

IntroScene.prototype = {

	constructor: IntroScene,

	init: function() {
		var viewRenderer = new this.viewLoader(
			this.model.getConfig("html"),
			this.model.getConfig("viewType"),
			this.model.getConfig("screen"),
			this.model.getConfig("UIArea")
		);
		viewRenderer.render(this.play);

		this.input.listen(this.model.getConfig("input"));

		this.view = viewRenderer.getView();
	},

	play: function() {
		this.view.display(this.model.getContent("intro"), "fade", this.nextScene);
	},

	nextScene: function() {
		console.log("next scene!");
	}
};

module.exports = IntroScene;
