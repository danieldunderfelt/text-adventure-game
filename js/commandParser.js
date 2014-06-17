var $ = require('jquery');
var globalCommands = require('./data/globalCommands');

var commandParser = function(contextCommands) {

	var self = this;
	var availableCommands = $.extend({}, globalCommands, contextCommands);

	this.parse = function(input) {
		
		// First, normalize to lower case and split at spaces
		var inputSegments = input.toLowerCase().split(" ");
		
		// If no command is found, this returns false
		var commandData = findCmdData(inputSegments);

		// Insert the arguments if we've struck gold. Get the arguments at the defined starting index.
		if( commandData !== false ) commandData.arguments = inputSegments.splice(commandData.argumentStartIndex);

		// Return what we got, or false.
		return commandData;
	};

	var findCmdData = function(inputSegments) {
		// False by default
		var commandData = false;

		for (var cmd in availableCommands) {
			
			// If the first part of the input matches our available top-level commands,
			if (availableCommands.hasOwnProperty(cmd) && cmd === inputSegments[0]) {
			
				// check if it has sub-commands (ie has a object called 'methods')
				if( typeof availableCommands[cmd]["methods"] === "undefined" ) {
			
					// If not, this is the command data we want.
					commandData = availableCommands[cmd];
			
					// Append the full command
					commandData.fullCommand = inputSegments;

					// And tell our friend above at what index the arguments start
					commandData.argumentStartIndex = 1;
			
					// And done.
					break;
				}
				else {
			
					// Interesting, we DO have subcommands! Loop them.
					for (var subCmd in availableCommands[cmd]["methods"]) {
			
						// Now we check against segment 2.
						if( availableCommands[cmd]["methods"].hasOwnProperty(subCmd) && subCmd === inputSegments[1] ) {
			
							// Nice, a match! We're not interested in the rest of the segments, they're just arguments for this command.
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