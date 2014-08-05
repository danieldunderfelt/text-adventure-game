var $ = require('jquery');
var BaseView = require('./BaseView');

var TextView = function(ele) {
	this.ele = ele;
	this.baseRenderer = new BaseView(ele);
};

TextView.prototype = {

	constructor: TextView,

	render: function(data, callback) {
		this.baseRenderer.renderSimple(data, "white", "fade", callback);
	},
};

module.exports = TextView;