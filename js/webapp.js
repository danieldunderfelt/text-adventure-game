var $ = require('jquery');
var loader = require('./GameLoader');

var Application = function() {

    var self = this;

    this.loadGame = "";
    this.saveSlotNames = {};

    var dev = true;

    this.init = function() {
        loader.initSaveSlots();

        if(dev) {
            loader.loadDev();
            hideMenu();
        }
        else {
            self.saveSlotNames = loader.slotNamesList;
            doMainMenu();
        }
    };

    this.start = function() {
        hideMenu(beforeLoad);
    };

    var doMainMenu = function() {
        populateSaveList();

        $('input[name="save"]').on("change", setGame);
        $("#startGame").on("click", self.start);
        $("#purgeSaves").on("click", loader.removeAllSaves);
    };

    var setGame = function(e) {
        self.loadGame = $(this).val();
        $("#startGame").attr("disabled", false);
    };

    var populateSaveList = function() {
        var $list = $("#saveList");

        for(var save = 0; save < self.saveSlotNames.length; save++) {
            var $slotRadio = $('<input type="radio" name="save" value="' + self.saveSlotNames[save] + '">');
            var $slotLabel = $('<label></label>').text(self.saveSlotNames[save]).prepend($slotRadio);
            var $slotUI = $('<li></li>').append($slotLabel);

            $list.append($slotUI);
        }
    };

    var hideMenu = function(callback) {
        callback = callback || function() {};

        $(".start-screen").fadeOut(500, callback).addClass("in-game");
    };

    var beforeLoad = function() {
        if(self.loadGame === "new") {
            loader.newSave();
        }

        loader.load(self.loadGame);
    };
};

module.exports = Application;