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
        if(self.loadGame === "") {
            self.loadGame = "new";
        }
        hideMenu(beforeLoad);
    };

    var doMainMenu = function() {
        populateSaveList();

        $('input[name="save"]').on("change", setGame);
        $("#startGame").on("click", self.start);
        $("#purgeSaves").on("click", loader.removeAllSaves);
    };

    var setGame = function(e) {
        self.loadGame = $(this).attr("checked", true).val();
        $("#startGame").attr("disabled", false);
    };

    var populateSaveList = function() {
        var $list = $("#saveList");

        for(var save = 0; save < self.saveSlotNames.length; save++) {
            var radioId = self.saveSlotNames[save] + '-' +Date.now();
            var $slotRadio = $('<input type="radio" name="save" id="'+ radioId +'" value="' + self.saveSlotNames[save] + '">');
            var $slotLabel = $('<label for="'+ radioId +'"></label>').text(self.saveSlotNames[save]);
            var $slotUI = $('<li></li>').append($slotRadio).append($slotLabel);

            $list.append($slotUI);
        }
    };

    var hideMenu = function(callback) {
        callback = callback || function() {};

        $(".start-screen").fadeOut(500, callback);
        $("body").addClass("in-game");
    };

    var beforeLoad = function() {
        if(self.loadGame === "new") {
            loader.newSave();
        }

        loader.load(self.loadGame);
    };
};

module.exports = Application;