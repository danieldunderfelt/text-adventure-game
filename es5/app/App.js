"use strict";
var $ = require('jquery');
var GameLoader = require('./GameLoader');
var _ = require('lodash');
var Application = function Application() {
  this.loader = new GameLoader();
  this.loadGame = "";
  this.dev = false;
};
($traceurRuntime.createClass)(Application, {
  init: function() {
    this.loader.init();
    if (this.dev) {
      this.loader.loadDev();
      this.hideMenu();
    } else {
      this.doMainMenu();
    }
  },
  start: function() {
    if (this.loadGame === "") {
      this.loadGame = "new";
    }
    this.hideMenu(this.beforeLoad);
  },
  doMainMenu: function() {
    this.populateSaveList();
    $('input[name="save"]').on("change", $.proxy(this.setGame, this));
    $("#startGame").on("click", $.proxy(this.start, this));
    $("#purgeSaves").on("click", this.loader.removeAllSaves);
  },
  setGame: function(e) {
    this.loadGame = $(this).attr("checked", true).val();
    $("#startGame").attr("disabled", false);
  },
  populateSaveList: function() {
    var $list = $("#saveList");
    for (var save = 0; save < this.loader.saveSlotNames; save++) {
      var radioId = this.loader.saveSlotNames[$traceurRuntime.toProperty(save)] + '-' + Date.now();
      var $slotRadio = $('<input type="radio" name="save" id="' + radioId + '" value="' + this.loader.saveSlotNames[$traceurRuntime.toProperty(save)] + '">');
      var $slotLabel = $('<label for="' + radioId + '"></label>').text(this.loader.saveSlotNames[$traceurRuntime.toProperty(save)]);
      var $slotUI = $('<li></li>').append($slotRadio).append($slotLabel);
      $list.append($slotUI);
    }
  },
  hideMenu: function(callback) {
    callback = callback || function() {};
    $(".start-screen").fadeOut(500, $.proxy(callback, this));
    $("body").addClass("in-game");
  },
  beforeLoad: function() {
    if (this.loadGame === "new") {
      this.loader.newSave();
    }
    this.loader.load(this.loadGame);
  }
}, {});
module.exports = Application;
