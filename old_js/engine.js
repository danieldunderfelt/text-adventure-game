var story = require("./story");
var commands = require("./commands");
var uitext = require("./uitext");

var engine = function() {

	var self = this;
	self.stage = "welcome";

	var commandCache = [];
	var currentStory = [];

	this.getInitContent = function() {
		currentStory.push(story[self.stage].init);
		return story[self.stage].init;
	};

	this.doCommand = function(command) {
		var comObj = searchCommand(command);
		if(comObj === false) return false;
		return getContent(comObj);
	};

	var searchCommand = function(command) {
		var com = command.toLowerCase();
		var getCommand = commands[com] !== undefined ? commands[com] : false;
		return getCommand;
	};

	var getContent = function(command) {
		if(validateCommand(command) === false) return false;
		var content = doCommandAction(command.action);
		return content;
	};

	var validateCommand = function(command) {
		if(command.activeOn === "all") return true;
		return command.activeOn.indexOf(self.stage) > -1;
	};

	var doCommandAction = function(action) {
		var result = false;

		if(action[0] === "goto") {
			result = doGoto(action[1]);
			self.stage = action[1];
		}

		if(action[0] === "do") {
			result = doCommand(action[1]);
		}

		return result;
	};

	var doCommand = function(action) {
		return uitext[action];
	};

	var doGoto = function(toStage) {
		return story[toStage].init;
	};
};

module.exports = engine;