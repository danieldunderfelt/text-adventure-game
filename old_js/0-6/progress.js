var Progress = {

	storageKey: "textadventuregame",

	save: function(data) {
		var extSaves = JSON.parse(localStorage.getItem(this.storageKey));
		extSaves[data.name] = data;
		localStorage.setItem(this.storageKey, JSON.stringify(extSaves));
	},

	load: function(slotName) {
		return JSON.parse(localStorage.getItem(this.storageKey))[slotName];
	},

	createSaveSlots: function() {
		var extSaves = localStorage.getItem(this.storageKey);

		if(!extSaves) {
			this.clearSaves();
		}
	},

	clearSaves: function() {
		localStorage.setItem(this.storageKey, JSON.stringify({}));
	},

	getSaveList: function() {
		var saveSlots = JSON.parse(localStorage.getItem(this.storageKey));
		var slotNames = Object.keys(saveSlots);
		return slotNames;
	}
};

module.exports = Progress;