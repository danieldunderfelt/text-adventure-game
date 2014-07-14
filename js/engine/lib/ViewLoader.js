var TextView = require('../views/TextView');
var TerminalView = require('../views/TerminalView');

var ViewLoader = {

	load: function(view, screen) {
		var viewClass;

		switch(view) {
			case "text":
				viewClass = TextView;
				break;
			case "terminal":
				viewClass = TerminalView;
				break;
			default:
				viewClass = TerminalView;
				break;
		}

		return new viewClass(screen);
	},
};

module.exports = ViewLoader;