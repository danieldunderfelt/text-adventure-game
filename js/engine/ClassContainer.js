var ClassContainer = {
	input: require('./input/InputController'),
	commandParser: require('./lib/CommandParser'),
	stringReplace: require('./lib/StringReplace'),
	viewLoader: require('./lib/ViewLoader'),
	uiLoader: require('./lib/UILoader'),
	sceneLoader: require('./lib/SceneLoader'),
};

module.exports = ClassContainer;