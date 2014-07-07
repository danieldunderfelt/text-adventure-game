var engine = require('./engine/engine');
var game = require('./game/GameController');
var saveStruct = require('./game/data/saveSchema');

var GameLoader = {

	storageKey: "textadventuregame",
	currentSaveName:"",
	slotNamesList: null,

	initSaveSlots: function(force) {
		force = typeof force === "undefined" ? false : force;

		var extSaves = localStorage.getItem(this.storageKey);

		if(!extSaves || force === true) {
			localStorage.setItem(this.storageKey, JSON.stringify({}));
		}

		this.slotNamesList = this.getSaveList();
	},

	load: function(loadSave) {
		if(loadSave === "new") {
			loadSave = this.currentSaveName;
		}

		var saveData = this.getSaveData(loadSave);
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
			this.initSaveSlots(true);
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
		game.init(saveData);
		engine.start();
	},

	save: function(data) {
		var extSaves = JSON.parse(localStorage.getItem(this.storageKey));
		extSaves[data.name] = data;
		localStorage.setItem(this.storageKey, JSON.stringify(extSaves));
	},

	getSaveData: function(slotName) {
		var data = JSON.parse(localStorage.getItem(this.storageKey))[slotName];
		return data;
	},

	getSaveList: function() {
		var saveSlots = JSON.parse(localStorage.getItem(this.storageKey));
		var slotNames = Object.keys(saveSlots);
		return slotNames;
	}
};

module.exports = GameLoader;