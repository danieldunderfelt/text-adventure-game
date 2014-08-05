var progress = require('../engine/util/Progress');
var Game = require('../game/GameController');

class GameLoader {

	constructor() {
		this.progress = new progress();
		this.currentSaveName = "";
		this.saveSlotNames = null;
	}

	init() {
		this.progress.createSaveSlots();
		this.saveSlotNames = this.progress.getSaveList();
	}

	load(loadSave) {
		if(loadSave === "new") {
			loadSave = this.currentSaveName;
		}

		var saveData = this.progress.load(loadSave);
		this.initializeGame(saveData);
	}

	newSave() {
		var save = {};
		var saveName = prompt("Give your save a name:");
		this.currentSaveName = saveName;
		save.name = this.currentSaveName;
		this.progress.save(save);
	}

	removeAllSaves() {
		if(confirm("Are you sure?")) {
			this.progress.clearSaves();
			location.reload(); // Quick and VERY dirty >:)
		}
	}

	loadDev() {
		var extSaves = localStorage.getItem("text_dev");

		if(!extSaves) {
			var save = {};
			save.name = "dev";
			localStorage.setItem("text_dev", JSON.stringify({"dev": save}));
		}

		var devData = JSON.parse(localStorage.getItem("text_dev"))["dev"];
		this.initializeGame(devData);
	}

	initializeGame(saveData) {
		var game = new Game(saveData);
		game.start();
	}

}

module.exports = GameLoader;