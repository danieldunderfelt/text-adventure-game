var $ = require('jquery');
var TextView = require('../views/TextView');
var TerminalView = require('../views/TerminalView');

var ViewLoader = function(view, type, screen, into, callback) {

	this.container = "#globalContainer";

	this.into = into;
	this.view = view;
	this.type = type;
	this.screen = screen;
	this.callback = callback;

	this.paths = {
		shared: 'game/scenes/shared/html/',
		scenes: 'game/scenes/'
	};
};

ViewLoader.prototype = {

	render: function() {
		this.into = !this.into ? this.container : this.into;
		var path = this.view.split(".");

		var pathObj = {
			folder: path[0],
			file: path[1],
			type: path[2]
		};

		this.getData(pathObj);
	},

	getData: function(pathObj) {
		var folderPath = typeof this.paths[pathObj.folder] === "undefined" ? this.paths.scenes + pathObj.folder + '/' : this.paths[pathObj.folder];
		var path = folderPath + pathObj.file + '.' + pathObj.type;

		$.ajax({
			context: this,
			url: path,
			success: this.doRender,
			dataType: "html"
		});
	},

	doRender: function(data) {
		$(this.into).html(data);
		this.callback();
	},

	getView: function() {
		var view;

		switch(this.type) {
			case "text":
				view = TextView;
				break;
			case "terminal":
				view = TerminalView;
				break;
			default:
				view = TerminalView;
				break;
		}

		return new view(this.screen);
	},
};

module.exports = ViewLoader;