class Progress {

	constructor() {
		this.storageKey = "textadventuregame";
	}

	save(data) {
		var extSaves = JSON.parse(localStorage.getItem(this.storageKey));
		extSaves[data.name] = data;
		localStorage.setItem(this.storageKey, JSON.stringify(extSaves));
	}

	load(slotName) {
		return JSON.parse(localStorage.getItem(this.storageKey))[slotName];
	}

	createSaveSlots() {
		var extSaves = localStorage.getItem(this.storageKey);
		if(!extSaves) {
			this.clearSaves();
		}
	}

	clearSaves() {
		localStorage.setItem(this.storageKey, JSON.stringify({}));
	}

	getSaveList() {
		var saveSlots = JSON.parse(localStorage.getItem(this.storageKey));
		var slotNames = Object.keys(saveSlots);
		return slotNames;
	}
}

module.exports = Progress;