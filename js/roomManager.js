var rooms = require('./data/roomlist');

var roomManager = function() {

	var self = this;

	this.currentRoom;

	this.init = function() {

	};

	this.loadRoom = function(roomId) {
		var room = rooms[roomId];
		
		if(typeof room !== "undefined") {
			self.currentRoom = room;
			self.currentRoom.init();
		}
	};
};

module.exports = roomManager;