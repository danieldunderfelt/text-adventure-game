var helpers = {
	isFunction: function(obj) {
	  return !!(obj && obj.constructor && obj.call && obj.apply);
	},
	extend: function(target, source) {
	  target = target || {};
	  for (var prop in source) {
	    if (typeof source[prop] === 'object') {
	      target[prop] = this.extend(target[prop], source[prop]);
	    } else {
	      target[prop] = source[prop];
	    }
	  }
	  return target;
	},
	scope: function(fn, me) {
		return function() {
			return fn.apply(me, arguments);
		};
	}
};

module.exports = helpers;