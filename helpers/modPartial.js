module.exports = function (path, context) {
	path = path.replace('/','');
	var partial = handlebars.partials[path];
	if (typeof partial !== 'function') {
		partial = handlebars.compile(partial);
	}
	if(context) {
		// Assume every parameter after path + context are modifier classes (excluding last = options object)
		context._modifiers = Array.prototype.slice.call(arguments,2,-1);
	}
	return partial(context);
};