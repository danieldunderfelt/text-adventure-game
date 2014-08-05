"use strict";
var progress = require('./util/Progress');
var Engine = function Engine() {};
($traceurRuntime.createClass)(Engine, {conststructor: function() {
    this.progress = new progress();
  }}, {});
module.exports = Engine;
