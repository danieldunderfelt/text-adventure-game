var $ = require('jquery');
var BaseView = require('./BaseView');

var TextView = function(ele) {
	this.ele = ele;
	this.baseRenderer = new BaseView(ele);
	this.content = [];
	this.callback = function() {};
};

TextView.prototype = {

	constructor: TextView,

	init: function(content, callback) {
		this.content = content;
		this.callback = callback;
	},

	display: function(position, effect, callback) {
		var content = this.content[position];
		var self = this;

		if(position < this.content.length) {
			self.render(content[position], effect);
		}
		else {
			this.callback();
		}
	},

	render: function(data, effect) {
		this.baseRenderer.renderSimple(data, null, effect);
	},
};

module.exports = TextView;