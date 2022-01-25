module.exports = function (path, context, options) {
	path = path.replace('/', '');
	
	var partial = handlebars.partials[path];
	if (typeof partial !== 'function') {
		partial = handlebars.compile(partial);
	}
	
	if (context) {
		// Assume every parameter after path + context are modifier classes (excluding last = options object)
		context._modifiers = Array.prototype.slice.call(arguments, 2, -1);
	}

	// Assume that last parameter is an options object
	let hash = arguments[arguments.length - 1].hash;
	let data = context;
	if (typeof data === 'object') {
		Object.keys(hash).forEach(key => {
			data[key] = hash[key];
		})
	}
	return partial(data);
}
