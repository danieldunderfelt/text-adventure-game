"use strict";
var progress = require('../engine/util/Progress');
var Game = require('../game/GameController');
var GameLoader = function GameLoader() {
  this.progress = new progress();
  this.currentSaveName = "";
  this.saveSlotNames = null;
};
($traceurRuntime.createClass)(GameLoader, {
  init: function() {
    this.progress.createSaveSlots();
    this.saveSlotNames = this.progress.getSaveList();
  },
  load: function(loadSave) {
    if (loadSave === "new") {
      loadSave = this.currentSaveName;
    }
    var saveData = this.progress.load(loadSave);
    this.initializeGame(saveData);
  },
  newSave: function() {
    var save = {};
    var saveName = prompt("Give your save a name:");
    this.currentSaveName = saveName;
    save.name = this.currentSaveName;
    this.progress.save(save);
  },
  removeAllSaves: function() {
    if (confirm("Are you sure?")) {
      this.progress.clearSaves();
      location.reload();
    }
  },
  loadDev: function() {
    var extSaves = localStorage.getItem("text_dev");
    if (!extSaves) {
      var save = {};
      save.name = "dev";
      localStorage.setItem("text_dev", JSON.stringify({"dev": save}));
    }
    var devData = JSON.parse(localStorage.getItem("text_dev"))[$traceurRuntime.toProperty("dev")];
    this.initializeGame(devData);
  },
  initializeGame: function(saveData) {
    var game = new Game(saveData);
    game.start();
  }
}, {});
module.exports = GameLoader;
