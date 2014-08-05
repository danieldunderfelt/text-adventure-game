var input = require('./input/InputController');
var uiLoader = require('./lib/UILoader');
var viewLoader = require('./lib/ViewLoader');
var sceneLoader = require('./lib/SceneLoader');
var commandParser = require('./lib/CommandParser');

var Engine = {
	input: input,
	uiLoader: uiLoader,
	sceneLoader: sceneLoader,
	viewLoader: viewLoader,
	commandParser: commandParser,
};

module.exports = Engine;