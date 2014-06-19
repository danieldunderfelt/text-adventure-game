var UItext = require('../data/UItext');
var baseRoom = require('./baseRoom');
var userCreation = require('../roomLib/userCreation');

var CharacterCreation = function(game) {
	this.prototype = Object.create(baseRoom);
	baseRoom.call(this);

	var self = this;
	this.game = game;

	this.init = function() {
		self.userCreation = new userCreation(self);
		self.print(self.content.start);
	};

	this.createUser = function() {
		game.input.deferInput(self.userCreation.receiveInput);
		self.userCreation.begin();
	};

	this.content = {
		start: [
			"### USER CREATION ###",
			"You will need root access to ShadowCommand to perform your tasks. Write 'create user' to begin user creation."
		],
		userCreation: {
			begin: ["Enter username:"],
			confirmName: ["Your username is :1"],
			gender: ["Select your gender. Enter '1' for 'male' or '2' for 'female':"],
			confirmGender: ["You have selected :1"],
			stats: {
				init: [
					"To complete your personality profile, please assign points to the following.",
					"Assign points by writing the name of the trait followed by how many points you want to assign to it.",
					"The traits are:",
					["social", "blue"],
					["anarchist", "blue"],
					["criminal", "blue"],
					["intelligence", "blue"],
					["luck", "blue"],
					"You have 20 points left to assign. If you change your mind, just assign again."
				],
				pointsCounter: ["You have <span style='color: green;'>:1</span> points left to assign."]
			}
		},
		commandError: "Access denied. Your instructions include all permitted actions."
	};

	this.commands = {
		"create": {
			methods: {
				"user": {
					type: "action",
					scope: "room",
					action: "createUser",
					active: true
				}
			},
			description: "'Create user' activates user creation."
		}
	};
};

module.exports = CharacterCreation;