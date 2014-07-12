var $ = require('jquery');
var helpers = require('../../helpers');

var ButtonInput = function(key, target, callback) {

	this.key = key || 32;
	this.target = target || window;
	this.callback = callback || function() {};

	this.onAction = helpers.scope(this.onAction, this);
};

ButtonInput.prototype = {

	constructor: ButtonInput,

	listen: function() {
		if(this.key === "mouse") {
			this.listenMouse();
		}

		else if(typeof this.key === "number") {
			this.listenKey();
		}
	},

	listenMouse: function() {
		$(this.target).on("click.buttoninputclick", this.onAction);
	},

	listenKey: function() {
		var self = this;

		$(window).on("keydown", function(e) {
			if(e.keyCode === self.key) {
				self.onAction(e);
			}
		});
	},

	onAction: function(e) {
		e.preventDefault();
		callback();
	}
};

module.exports = ButtonInput;