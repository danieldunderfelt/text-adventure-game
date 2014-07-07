var gameLoader = require('../../js/GameLoader.js');
var saveStruct = require('../../js/game/data/saveSchema');

describe("GameLoader", function() {

	beforeEach(function() {
		// purges saves before each test
		gameLoader.slotNamesList = [];
	});

	describe("#initSaveSlots()", function() {

		before(function() {
			localStorage.removeItem(gameLoader.storageKey);
		});

		it('should put the save data into slotNamesList', function() {
			gameLoader.initSaveSlots();
			expect(gameLoader.slotNamesList).to.be.an('array');
			expect(gameLoader.slotNamesList).to.be.empty();
		});
	});
	describe("#initSaveSlots()", function() {
		it('should have a save in the array after making a save', function() {
			gameLoader.initSaveSlots();
			gameLoader.save({"test": {}});
			gameLoader.initSaveSlots();
			expect(gameLoader.slotNamesList).to.be.an('array');
			expect(gameLoader.slotNamesList).to.not.be.empty();
		});
	});
	describe("#initSaveSlots()", function() {
		it('should set slotNamesList to an empty array after purging saves', function() {
			gameLoader.save({"test": saveStruct});
			gameLoader.initSaveSlots();
			expect(gameLoader.slotNamesList).to.not.be.empty();
			gameLoader.initSaveSlots(true);
			expect(gameLoader.slotNamesList).to.be.empty();
		});
	});

	describe("#save()", function() {
		it('should put the object in a new property in localStorage', function() {
			gameLoader.initSaveSlots();
			var save = saveStruct;
			save.name = "test";
			gameLoader.save(save);
			var storage = JSON.parse(localStorage.getItem(gameLoader.storageKey));
			expect(storage).to.be.an("object");
			expect(storage).to.have.property("test");
			expect(storage.test).to.be.an('object');
			expect(storage.test).to.have.property("name", "test");
		});
	});

	describe("#getSaveList()", function() {

		before(function() {
			gameLoader.initSaveSlots(true);
			var save = saveStruct;
			save.name = "test";
			gameLoader.save(save);
		});

		it('should get a list of save names from localstorage', function() {
			var savelist = gameLoader.getSaveList();
			expect(savelist).to.be.an('array');
			expect(savelist).to.contain('test');
		});
	});
});