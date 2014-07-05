var $ = require('jquery');

var ViewLoader = function() {

	var self = this;
	var $container = $("#globalContainer");

	this.load = function(data, $into) {
		$into = typeof $into === "undefined" ? $container : $into;
	};
};