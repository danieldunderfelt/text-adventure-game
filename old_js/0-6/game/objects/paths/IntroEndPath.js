var IntroEndPath = function(callback) {
	this.callback = callback;
}

IntroEndPath.prototype = {
	leadsTo: "test1",
	description: "Begin the game",
	locked: false,

	activate: function() {
		callback(this.leadsTo);
	}
}

module.exports = IntroEndPath;