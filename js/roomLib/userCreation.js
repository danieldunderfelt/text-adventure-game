var userCreation = function(room) {

	var self = this;
	var userData = {};
	var currentStage = "";

	this.begin = function() {
		room.print(room.content.userCreation.begin);
		currentStage = "createName";
		return currentStage;
	};

	this.receiveInput = function(input) {
		console.log(input);
	};

	this.createName = function(input) {
		userData.name = input;
	};
};

module.exports = userCreation;