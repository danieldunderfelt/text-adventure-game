var $ = require('jquery');
var BaseView = require('./BaseView');

var TextView = function(ele) {
	this.ele = ele;
	this.baseRenderer = new BaseView(ele);
};

TextView.prototype = {

	display: function(data, effect, callback) {
		var counter = 0;
		var content = data;
		var self = this;

		function next() {

			if(counter < data.length) {
				self.render(content[counter], effect);
				counter++;

				$(window).one("keydown", function(e) {
					if(e.keyCode === 32) {
						next();
					}
				});
			}
			else {
				callback();
			}
		}

		next();
	},

	render: function(data, effect) {
		this.baseRenderer.renderSimple(data, null, effect);
	},
};

module.exports = TextView;