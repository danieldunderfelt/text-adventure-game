var prompt = require('../lib/inputPrompt');

var userCreation = function(room) {

	var self = this;
	var userData = room.game.gameData.settings.player;

	var stage = "name";
	var promptHandler;

	this.begin = function() {
		promptHandler = new prompt(userData, this.prompts, stage, self.userCreationDone);
		promptHandler.start();
	};

	this.receiveInput = function(input) {
		promptHandler.processInput(input);
	};

	this.userCreationDone = function() {

	};

	this.prompts = {
		name: {
			before: function() {
				room.print(room.content.userCreation.begin);
			},
			after: function() {
				room.print(room.content.userCreation.confirmName, [userData.name]);
			},
			type: "text",
			next: "gender",
			acceptedValues: ["all"]
		},
		gender: {
			before: function() {
				room.print(room.content.userCreation.gender);
			},
			after: function() {
				room.print(room.content.userCreation.confirmGender, [userData.gender]);	
			},
			type: "text",
			next: "stats",
			acceptedValues: ["male", "female"]
		},
		stats: {
			before: function() {
				room.print(room.content.userCreation.stats.init);
			},
			after: function() {
				this.printStatus();
			},
			printStatus: function(pointsLeft) {
				var values = [];
				for(var stat in userData.stats) {
					values.push(userData.stats[stat]);
				}
				values.push(pointsLeft);
				room.print(room.content.userCreation.stats.recap, values);
			},
			onChoice: function(assignedPoints, assignedStat) {
				room.print(room.content.userCreation.stats.pointsAssignedMsg, [assignedPoints, assignedStat]);
			},
			onError: function(error, data) {
				room.print(room.content.userCreation.stats[error], [data]);
			},
			type: "multichoice",
			limit: 20,
			next: "done"
		},
		commandError: function() {
			room.printSimple("That value is not allowed.");
		}
	};

	this.setGender = function(input) {
		if(input === false) {
			
		}
		else if(input == 1 || input == 2) {
			console.log(input);
			userData.gender = input == 1 ? "male" : "female";
			
			self.setStats(false);
			giveInputTo = self.setStats;
			return true;
		}
		else {
			return false;
		}
	};

	this.setStats = function(input) {
		if(input === false) {
			room.print(room.content.userCreation.stats.init);
		}
		else {
			var setStat = validateStat(input);
			
			if(setStat === false) {
				room.printSimple([room.content.commandError, "red"]);
				return true;
			}
			else {
				userData.stats[setStat[0]] = setStat[1];
				availablePoints = availablePoints - setStat[1];
				room.print(room.content.userCreation.stats.pointsCounter, [availablePoints]);
			}
		}
	};

	var validateStat = function(input) {
		var parts = input.split(" ");
		var stats = Object.keys(userData.stats);
		var output = {};

		if(stats.indexOf(parts[0]) !== -1) {
			return parts;
		}
		else {
			return false;
		}
	};
};

module.exports = userCreation;