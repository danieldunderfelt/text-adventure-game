var CommandsInput = require('./CommandsInput');
var ButtonInput = require('./ButtonInput');

var InputController = {

	listen: function(inputMethod) {
		if(inputMethod === null)
			return false;
		if(inputMethod === "button")
			return;
	}
};

module.exports = InputController;