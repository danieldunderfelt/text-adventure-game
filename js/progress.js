var Progress = function() {

	var self = this;

	this.save = function(gameData) {
		localStorage.setItem("textadventure", JSON.stringify(gameData));
	}

	this.load = function() {
		var savedData = localStorage.getItem("textadventure");
		return JSON.parse(savedData);
	};
};

module.exports = new Progress();