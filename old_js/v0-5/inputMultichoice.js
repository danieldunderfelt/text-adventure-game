var inputMultiChoice = function(inputHandler, dataset, promptData) {

	// We need this to be a singleton
	if ( arguments.callee._singletonInstance )
	    return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	var self = this;
	var limit = promptData.limit;
	var usedPoints = 0;
	var isDone = false;

	this.process = function(input) {
		var parts = input.split(" ");
		var action = self.analyze(parts);
		
 		var actionSuccess = action(parts);

		if(actionSuccess === true) {
			inputHandler.cleanInput();
			return isDone;
		}
		else if(actionSuccess === false) {
			inputHandler.doError();
			return false;
		}
		else if(actionSuccess === "do nothing") {
			return "do nothing";
		}
	};

	this.outputComplete = function() {
		return {
			input: dataset,
			proceed: true
		};
	};

	this.analyze = function(input) {
		if(typeof self.utilCommands[input[0]] !== "undefined") {
			return self.utilCommands[input[0]];
		}
		else if(Object.keys(dataset).indexOf(input[0]) !== -1) {
			return self.setChoice;
		}
		else {
			return function() { return false; }
		}
	};

	this.setChoice = function(input) {
		var status = distributePoints(input);
		if(status === true) {
			promptData.onChoice(input[1], input[0]);
			return true;
		}
		else if(status == false) {
			promptData.onError("notAllowedError", limit - usedPoints);
			return;
		}
	};

	var distributePoints = function(input) {
		var points = parseInt(input[1], 10);
		var toStat = input[0];

		// First check, the basics
		if(
			points > limit ||
			points + usedPoints > limit ||
			points < 1
		) {
			return false;
		}

		// Second check, we do a dry run
		var datasetCopy = JSON.parse(JSON.stringify(dataset));
		datasetCopy[toStat] = points;

		var total = 0;
		for(var stat in datasetCopy) {
			total = total + datasetCopy[stat];
		}

		if(total > limit) {
			return false;
		}

		// And now we can comfortably do the real assignment and points distribution.
		dataset[toStat] = points;
		usedPoints = usedPoints + points;

		return true; 
	};

	this.utilCommands = {
		summary: function() {
			promptData.printStatus(limit - usedPoints);
			inputHandler.cleanInput();
			return;
		},
		done: function() {
			var status = usedPoints === 20 ? true : false;
			
			if(status === false) {
				promptData.onError("notDoneError", limit - usedPoints);
				inputHandler.cleanInput();
				return;
			}
			else {
				isDone = true;
				return true;
			}
		}
	};

};

module.exports = inputMultiChoice;