var CommandsInput = require('./CommandsInput');
var ButtonInput = require('./ButtonInput');

var InputController = function(inputMethod, config, callback) {
	this.method = inputMethod;
	this.config = config;
	this.callback = callback;
};

InputController.prototype = {

	constructor: InputController,

	listen: function() {
		var inputHandler;

		switch(this.Method) {
			case null:
				inputHandler = false;
				break;
			case "button":
				inputHandler = ButtonInput;
				break;
			default:
				inputHandler = CommandsInput;
				break;
		}

		inputHandler.listen(this.config, this.callback);
	}
};

module.exports = InputController;