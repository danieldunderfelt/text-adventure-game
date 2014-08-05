var StringReplace = {

	put: function(dynamicContent, content) {

		var re = /(:[0-9])/ig;
		for(var c = 0; c < content.length; c++) {
			var test;
			var contentIsArray = false;

			if(content[c] instanceof Array) {
				test = content[c][0].match(re);
				contentIsArray = true;
			}
			else if (typeof content[c] ===  "string") {
				test = content[c].match(re);
			}
			else {
				throw "Content must be array or string.";
			}

			if(test !== null) {
				for(var d = 0; d < test.length; d++) {
					var dynIndex = parseInt(test[d].replace(":", ""), 10);
					var preparedContent;
					var replacement = dynamicContent[dynIndex - 1];

					if(contentIsArray === true) {
						preparedContent = content[c][0].replace(test[d], replacement);
						content[c][0] = preparedContent;
					}
					else {
						preparedContent = content[c].replace(test[d], replacement);
						content[c] = preparedContent;
					}
				}
			}
		}

		return content;
	}

};

module.exports = StringReplace;