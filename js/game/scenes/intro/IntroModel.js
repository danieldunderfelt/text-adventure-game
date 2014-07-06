var SceneModel = require('../../SceneModel');
var data = require('./data');

var IntroModel = function() {
	this.data = data;
};

IntroModel.prototype = Object.create(SceneModel.prototype);

module.exports = IntroModel;