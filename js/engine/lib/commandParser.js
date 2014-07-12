var helpers = require('../../helpers');

var commandParser = function(availableCommands) {

	this.parse = function(input) {

		var inputSegments = input.toLowerCase().split(" ");
		var commandData = findCmdData(inputSegments);
		if( commandData !== false ) commandData.arguments = inputSegments.splice(commandData.argumentStartIndex);

		return commandData;
	};

	var findCmdData = function(inputSegments) {
		var commandData = false;

		for (var cmd in availableCommands) {
			if (availableCommands.hasOwnProperty(cmd) && cmd === inputSegments[0]) {
				if( typeof availableCommands[cmd]["methods"] === "undefined" ) {
					commandData = availableCommands[cmd];
					commandData.fullCommand = inputSegments;
					commandData.argumentStartIndex = 1;

					break;
				}
				else {
					for (var subCmd in availableCommands[cmd]["methods"]) {
						if( availableCommands[cmd]["methods"].hasOwnProperty(subCmd) && subCmd === inputSegments[1] ) {
							commandData = availableCommands[cmd]["methods"][subCmd];
							commandData.fullCommand = inputSegments;
							commandData.argumentStartIndex = 2;

							break;
						}
					}
				}
			}
		}

		return commandData;
	};
};

module.exports = commandParser;