var TextView = require('../views/TextView');
var TerminalView = require('../views/TerminalView');

var ViewLoader = function(screen, view) {

	this.screen = screen;
	this.view = view;
};

ViewLoader.prototype = {

	load: function() {
		var view;

		switch(this.view) {
			case "text":
				view = TextView;
				break;
			case "terminal":
				view = TerminalView;
				break;
			default:
				view = TerminalView;
				break;
		}

		return new view(this.screen);
	},
};

module.exports = ViewLoader;