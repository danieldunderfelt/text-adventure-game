var game = require('../../js/game/GameController');
var loader = require('../../js/GameLoader');
var saveStruct = require('../../js/game/data/saveSchema');

describe('#init', function() {

	it('should receive save data', function() {
		var save = saveStruct;
		save.name = "test";
		game.init(save);
		expect(game.saveData).to.be.an('object');
		expect(game.saveData).to.have.property('name', 'test');
	});
});