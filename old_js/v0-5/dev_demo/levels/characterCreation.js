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
			confirmName: ["Your username is <span style='color: lime;'>:1</span>"],
			gender: ["Select your gender. Enter 'male' or 'female':"],
			confirmGender: ["You have selected <span style='color: lime;'>:1</span>"],
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
					"You have 20 points left to assign. If you change your mind, just assign again. When you are done, enter 'done'. Note that you have to assign all the points to proceed."
				],
				recap: [
					"Summary of points assigned:",
					"social = <span style='color: lime;'>:1</span>",
					"anarchist = <span style='color: lime;'>:2</span>",
					"criminal = <span style='color: lime;'>:3</span>",
					"intelligence = <span style='color: lime;'>:4</span>",
					"luck = <span style='color: lime;'>:5</span>",
					"points left: <span style='color: lime;'>:6</span>", 
				],
				pointsAssignedMsg: [
					"You assigned <span style='color: lime;'>:1</span> points to <span style='color: lime;'>:2</span>"
				],
				notDoneError: [
					"You have :1 points left. Please assign them to traits before continuing."
				],
				notAllowedError: [
					["Amount of points not sufficient. You have :1 points left.", "red"]
				],
				pointsCounter: ["You have <span style='color: lime;'>:1</span> points left to assign."]
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
		},
		"done": {
			description: "Enter 'done' when you are satisfied with your character.",
			type: "action",
			scope: "room",
			action: "createUser",
			active: false
		}
	};
};

module.exports = CharacterCreation;