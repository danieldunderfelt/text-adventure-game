var game = require('./game/GameController');
var saveStruct = require('./game/data/saveSchema');
var progress = require('./progress');

var GameLoader = {

	currentSaveName: "",
	slotNamesList: null,

	init: function() {
		progress.createSaveSlots();
		this.slotNamesList = progress.getSaveList();
	},

	load: function(loadSave) {
		if(loadSave === "new") {
			loadSave = this.currentSaveName;
		}

		var saveData = progress.load(loadSave);
		this.initializeGame(saveData);
	},

	newSave: function() {
		var saveName = prompt("Give your save a name:");
		this.currentSaveName = saveName;
		saveStruct.name = this.currentSaveName;
		this.save(saveStruct);
	},

	removeAllSaves: function() {
		if(confirm("Are you sure?")) {
			progress.clearSaves();
			location.reload();
		}
	},

	loadDev: function() {
		var extSaves = localStorage.getItem("text_dev");

		if(!extSaves) {
			var saveData = saveStruct;
			saveData.name = "dev";
			localStorage.setItem("text_dev", JSON.stringify({"dev": saveData}));
		}

		var devData = JSON.parse(localStorage.getItem("text_dev"))["dev"];
		this.initializeGame(devData);
	},

	initializeGame: function(saveData) {
		var GameController = new game(saveData);
		GameController.start();
	}
};

module.exports = GameLoader;