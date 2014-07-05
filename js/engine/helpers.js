var helpers = {
	isFunction: function(obj) {
	  return !!(obj && obj.constructor && obj.call && obj.apply);
	},
	extend: function(target, source) {
	  target = target || {};
	  for (var prop in source) {
	    if (typeof source[prop] === 'object') {
	      target[prop] = extend(target[prop], source[prop]);
	    } else {
	      target[prop] = source[prop];
	    }
	  }
	  return target;
	}
};

module.exports = helpers;