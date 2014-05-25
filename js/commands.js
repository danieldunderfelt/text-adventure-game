var commands = {

	"log out": {
		action: ["do" ,"logout"],
		activeOn: "all"
	},
	"start": {
		action: ["goto", "1"],
		activeOn: ["welcome"]
	},
	"look around": {
		action: ["goto", "2"],
		activeOn: ["1"]
	},
	"go forward": {
		action: ["goto", "2"],
		activeOn: ["2"]
	},
};

module.exports = commands;