var $ = require('jquery');

var UILoader = {

	container: "#sceneContainer",
	into: "",
	callback: function() {},

	paths: {
		shared: 'game/scenes/shared/',
		scenes: 'game/scenes/'
	},

	load: function(html, into, callback) {
		this.callback = callback;
		this.into = !into ? this.container : into;
		var path = html.split(".");

		var pathObj = {
			folder: path[0],
			file: path[1]
		};

		this.getData(pathObj);
	},

	getData: function(pathObj) {
		var folderPath = typeof this.paths[pathObj.folder] === "undefined" ?
						 this.paths.scenes + pathObj.folder + '/' :
						 this.paths[pathObj.folder];

		var path = folderPath + pathObj.file + '.html';

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