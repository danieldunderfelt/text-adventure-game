var rooms = require('./data/roomlist');

var roomManager = function(game) {

	var self = this;

	this.currentRoom;

	this.init = function() {

	};

	this.loadRoom = function(roomId) {
		var room = rooms[roomId];
		
		if(typeof room !== "undefined") {
			self.currentRoom = new room(game);
			self.currentRoom.init();
		}

		return self.currentRoom;
	};
};

module.exports = roomManager;