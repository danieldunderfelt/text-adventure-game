var $ = require('jquery');

var UILoader = function(html, into) {

	this.container = "#globalContainer";

	this.into = into;
	this.html = html;
	this.callback;

	this.paths = {
		shared: 'game/scenes/shared/html/',
		scenes: 'game/scenes/'
	};
};

UILoader.prototype = {

	render: function(callback) {
		this.callback = callback;
		this.into = !this.into ? this.container : this.into;
		var path = this.html.split(".");

		var pathObj = {
			folder: path[0],
			file: path[1],
			type: path[2]
		};

		this.getData(pathObj);
	},

	getData: function(pathObj) {
		var folderPath = typeof this.paths[pathObj.folder] === "undefined" ?
						 this.paths.scenes + pathObj.folder + '/' :
						 this.paths[pathObj.folder];

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
	}
};

module.exports = UILoader;