var commands = require('../data/roomcommands/charCreationPrompts');
var UItext = require('../data/UItext');
var baseRoom = require('./baseRoom');
var userCreation = require('../roomLib/userCreation');

var CharacterCreation = function(game) {
	this.prototype = Object.create(baseRoom);
	baseRoom.call(this);

	var self = this;
	this.userCreation = new userCreation(this);

	this.init = function() {
		self.print(self.content.start);
	};

	this.userCreation = function() {
		game.input.deferInput(self.userCreation.receiveInput);
		self.userCreation.begin();
	};

	this.content = {
		start: [
			"/~~~/ USER CREATION /~~~/",
			"You will need root access to ShadowCommand to perform your tasks. Write 'create user' to begin user creation."
		],
		userCreation: {
			begin: ["Enter your desired username."]
		},
		commandError: "Access denied. Your instructions include all permitted actions."
	};

	this.commands = {
		"create": {
			methods: {
				"user": {
					type: "action",
					scope: "room",
					action: "userCreation",
					active: true
				}
			},
			description: "'Create user' activates user creation."
		}
	};
};

module.exports = CharacterCreation;