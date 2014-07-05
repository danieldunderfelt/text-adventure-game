var Resolver = function() {

	this.resolve = function(sceneObj) {
		var deps = getDependencyNames(sceneObj);
		console.log(deps)
	};

	var getDependencyNames = function(func) {
		var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
		var ARGUMENT_NAMES = /([^\s,]+)/g;

		var fnStr = func.toString().replace(STRIP_COMMENTS, '');
		var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
		if(result === null)
			result = []
		return result
	};
};

module.exports = new Resolver();