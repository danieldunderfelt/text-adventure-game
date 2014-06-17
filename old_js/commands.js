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
		action: ["goto", "3"],
		activeOn: ["2"]
	},
	"open door": {
		action: ["goto", "4"],
		activeOn: ["3"]
	},
	"talk co-passenger": {
		action: ["goto", "5"],
		activeOn: ["4"]
	},
	"look flabbergasted": {
		action: ["goto", "6"],
		activeOn: ["5"]
	},
	"kill co-passenger": {
		action: ["goto", "7"],
		activeOn: ["6"]
	},
	"sit chair": {
		action: ["goto", "8"],
		activeOn: ["7"]
	},
	"dream": {
		action: ["goto", "end"],
		activeOn: ["8"]
	},
};

module.exports = commands;