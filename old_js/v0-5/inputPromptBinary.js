var $ = require('jquery');

var InputPrompt = function(dataset, prompts, stage, callback) {

	var self = this;
	this.$input = $("#input");

	this.start = function() {
		prompts[stage].before();
	};

	this.progress = function() {
		self.cleanInput();
		prompts[stage].after();
		stage = prompts[stage].next;

		if(stage === "done") {
			callback();
		}
		else {
			self.start();
		}
	};

	this.processInput = function(input) {
		var processor;

		if(prompts[stage].type === "multichoice") {
			processor = multichoice.process;
		}
		else if(prompts[stage].type === "text") {
			processor = self.inputProcessor;
		}
		else {
			throw "No processor specified for this prompt type.";
		}

		self.afterProcess(processor(input));
	};

	this.afterProcess = function(processedInput) {
		if(processedInput === false) {
			self.doError();
		}
		else if(processedInput === "do nothing") {
			return;
		}
		else if(processedInput.proceed === true) {
			dataset[stage] = processedInput.input;
			self.progress();
		}
		else {
			return;
		}
	};

	this.inputProcessor = function(input) {
		if(prompts[stage].acceptedValues[0] === "all" || prompts[stage].acceptedValues.indexOf(input) !== -1) {
			return {
				input: input,
				proceed: true
			};
		}
		else {
			return false;
		}
	};

	this.doError = function() {
		prompts.commandError();
	};
 
	this.cleanInput = function() {
		self.$input.val("");
	};

};

module.exports = InputPrompt;