var engine = require('./engine/engine');
var game = require('./game/GameController');
var saveStruct = require('./game/data/saveSchema');

var GameLoader = function() {

	var self = this;
	var storageKey = "textadventuregame";
	var currentSaveName = "";
	this.slotNamesList = [];

	this.initSaveSlots = function(force) {
		force = typeof force === "undefined" ? false : force;

		var extSaves = localStorage.getItem(storageKey);

		if(!extSaves || force === true) {
			localStorage.setItem(storageKey, JSON.stringify({}));
		}

		self.slotNamesList = getSaveList();
	};

	this.load = function(loadSave) {
		if(loadSave === "new") {
			loadSave = currentSaveName;
		}

		var saveData = getSaveData(loadSave);

		initializeGame(saveData);
	};

	this.getSaves = function() {
		return getSaveList();
	};

	this.newSave = function() {
		var saveName = prompt("Give your save a name:");
		currentSaveName = saveName;
		saveStruct.name = currentSaveName;
		save(saveStruct);
	};

	this.removeAllSaves = function() {
		if(confirm("Are you sure?")) {
			self.initSaveSlots(true);
			location.reload();
		}
	};

	this.loadDev = function() {
		var extSaves = localStorage.getItem("text_dev");

		if(!extSaves) {
			var saveData = saveStruct;
			saveData.name = "dev";

			localStorage.setItem("text_dev", JSON.stringify(saveData));
		}

		var devData = JSON.parse(localStorage.getItem("text_dev"))["dev"];
		initializeGame(devData);
	};

	var initializeGame = function(saveData) {
		game.init(saveData);
		engine.start();
	};

	var save = function(data) {
		var extSaves = JSON.parse(localStorage.getItem(storageKey));
		extSaves[data.name] = data;
		localStorage.setItem(storageKey, JSON.stringify(extSaves));
	};

	var getSaveData = function(slotName) {
		var data = JSON.parse(localStorage.getItem(storageKey))[slotName];
		return data;
	};

	var getSaveList = function() {
		var saveSlots = JSON.parse(localStorage.getItem(storageKey));
		var slotNames = Object.keys(saveSlots);
		return slotNames;
	};
};

module.exports = new GameLoader();