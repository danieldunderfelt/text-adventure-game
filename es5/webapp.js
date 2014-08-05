"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var jQuery = require('jquery').jQuery;
var Application = function Application() {
  this.loadGame = "";
  this.saveSlotNames = {};
  this.dev = true;
};
($traceurRuntime.createClass)(Application, {
  init: function() {
    console.log("hah");
    console.log(jQuery);
    if (this.dev) {
      loader.loadDev();
      this.hideMenu();
    } else {
      this.saveSlotNames = loader.slotNamesList;
      doMainMenu();
    }
  },
  start: function() {
    if (self.loadGame === "") {
      self.loadGame = "new";
    }
    hideMenu(beforeLoad);
  },
  doMainMenu: function() {
    populateSaveList();
    $('input[name="save"]').on("change", setGame);
    $("#startGame").on("click", self.start);
    $("#purgeSaves").on("click", loader.removeAllSaves);
  },
  setGame: function(e) {
    self.loadGame = $(this).attr("checked", true).val();
    $("#startGame").attr("disabled", false);
  },
  populateSaveList: function() {
    var $list = $("#saveList");
    for (var save = 0; save < self.saveSlotNames.length; save++) {
      var radioId = self.saveSlotNames[$traceurRuntime.toProperty(save)] + '-' + Date.now();
      var $slotRadio = $('<input type="radio" name="save" id="' + radioId + '" value="' + self.saveSlotNames[$traceurRuntime.toProperty(save)] + '">');
      var $slotLabel = $('<label for="' + radioId + '"></label>').text(self.saveSlotNames[$traceurRuntime.toProperty(save)]);
      var $slotUI = $('<li></li>').append($slotRadio).append($slotLabel);
      $list.append($slotUI);
    }
  },
  hideMenu: function(callback) {
    callback = callback || function() {};
    $(".start-screen").fadeOut(500, callback);
    $("body").addClass("in-game");
  },
  beforeLoad: function() {
    if (self.loadGame === "new") {
      loader.newSave();
    }
    loader.load(self.loadGame);
  }
}, {});
var $__default = Application;
