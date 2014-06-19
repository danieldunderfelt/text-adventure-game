var userCreation = function(room) {

	var self = this;
	var userData = room.game.gameData.settings.player;
	var giveInputTo;
	var availablePoints = 20;

	this.begin = function() {
		room.print(room.content.userCreation.begin);
		giveInputTo = self.createName;
	};

	this.receiveInput = function(input) {
		var acceptance = giveInputTo(input);
		if(acceptance !== false) {
			room.game.input.cleanInput();
		}
	};

	this.createName = function(input) {
		userData.name = input;
		room.print(room.content.userCreation.confirmName, [userData.name]);
		self.setGender(false);
		giveInputTo = self.setGender;
		return true;
	};

	this.setGender = function(input) {
		if(input === false) {
			room.print(room.content.userCreation.gender);
		}
		else if(input == 1 || input == 2) {
			console.log(input);
			userData.gender = input == 1 ? "male" : "female";
			room.print(room.content.userCreation.confirmGender, [userData.gender]);
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