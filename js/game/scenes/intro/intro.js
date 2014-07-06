var model = require('./IntroModel');
var helpers = require('../../../engine/helpers');

var _bind = function(fn, me){ return function() { return fn.apply(me, arguments); }; };

var IntroScene = function(viewLoader, input) {

	this.viewLoader = viewLoader;
	this.view;
	this.input = input;
	this.model = new model();

	this.play = _bind(this.play, this);
	this.nextScene = _bind(this.nextScene, this);
};

IntroScene.prototype = {

	constructor: IntroScene,

	init: function() {
		var viewRenderer = new this.viewLoader(
			this.model.getConfig("html"),
			this.model.getConfig("viewType"),
			this.model.getConfig("screen"),
			this.model.getConfig("UIArea"),
			this.play
		);
		viewRenderer.render();

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
