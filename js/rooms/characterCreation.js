var commands = require('../data/roomcommands/charCreationPrompts');
var UItext = require('../data/UItext');
var baseRoom = require('./baseRoom');

var CharacterCreation = function() {
	this.prototype = Object.create(baseRoom);
	baseRoom.call(this);

	var self = this;

	this.commands = commands;

	this.init = function() {
		self.showContent(self.content.start);
	};

	this.content = {
		start: UItext.start,
		commandError: "Command not recognised. Try again."
	};
};

module.exports = new CharacterCreation();