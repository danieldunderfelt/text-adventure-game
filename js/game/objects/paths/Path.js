var BaseObject = require('../BaseObject');

var Path = function(direction, leadsTo) {
	this.type = "path";
	this.direction = direction;
	this.leadsTo = leadsTo;
};

Path.prototype = Object.create(BaseObject.prototype);

Path.prototype.activate = function() {

};

module.exports = Path;