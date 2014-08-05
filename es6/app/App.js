var $ = require('jquery');
var GameLoader = require('./GameLoader');
var _ = require('lodash');

class Application {

	constructor() {
		this.loader = new GameLoader();
		this.loadGame = "";
		this.dev = false;
	}

	init() {
		this.loader.init();

		if(this.dev) {
			this.loader.loadDev();
			this.hideMenu();
		}
		else {
			this.doMainMenu();
		}
	}

	start() {
		if(this.loadGame === "") {
			this.loadGame = "new";
		}

		this.hideMenu(this.beforeLoad);
	}

	doMainMenu() {
		this.populateSaveList();

		$('input[name="save"]').on("change", $.proxy(this.setGame, this));
		$("#startGame").on("click", $.proxy(this.start, this));
		$("#purgeSaves").on("click", this.loader.removeAllSaves);
	}

	setGame(e) {
		this.loadGame = $(this).attr("checked", true).val();
		$("#startGame").attr("disabled", false);
	}

	populateSaveList() {
		var $list = $("#saveList");

		for(var save = 0; save < this.loader.saveSlotNames; save++) {
			var radioId = this.loader.saveSlotNames[save] + '-' +Date.now();
			var $slotRadio = $('<input type="radio" name="save" id="'+ radioId +'" value="' + this.loader.saveSlotNames[save] + '">');
			var $slotLabel = $('<label for="'+ radioId +'"></label>').text(this.loader.saveSlotNames[save]);
			var $slotUI = $('<li></li>').append($slotRadio).append($slotLabel);

			$list.append($slotUI);
		}
	}

	hideMenu(callback) {
		callback = callback || function() {};

		$(".start-screen").fadeOut(500, $.proxy(callback, this));
		$("body").addClass("in-game");
	}

	beforeLoad() {
		if(this.loadGame === "new") {
			this.loader.newSave();
		}

		this.loader.load(this.loadGame);
	}
}

module.exports = Application;