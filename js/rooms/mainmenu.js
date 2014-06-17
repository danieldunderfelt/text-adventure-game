var UItext = require('../data/UItext');
var baseRoom = require('./baseRoom');

var MainMenu = function() {
	this.prototype = Object.create(baseRoom);
	baseRoom.call(this);

	var self = this;

	this.init = function() {
		self.showContent(self.content.start);
	};

	this.commands = {
		"new": {
			methods: {
				"session": {
					type: "default",
					scope: "game",
					action: "newGame",
					active: true
				},
			},
			description: "'new session' loads a new game."
		},
		"load": {
			type: "default",
			methods: {
				"session": {
					type: "default",
					scope: "game",
					action: "loadGame",
					active: true
				}
			},
			description: "'load session' loads a saved game."
		}
	}

	this.content = {
		start: UItext.start,
		commandError: "Command not recognised. Try again."
	};
};

module.exports = new MainMenu();