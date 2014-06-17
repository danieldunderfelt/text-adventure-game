var Application = require('./app');
var $ = require('jquery');

$(function() {
	window.CommandOS = new Application();
	CommandOS.init();
});