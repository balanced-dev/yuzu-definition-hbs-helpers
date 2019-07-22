module.exports = function (path, context) {
	path = path.replace('/','');
	var partial = handlebars.partials[path];
	if (typeof partial !== 'function') {
		partial = handlebars.compile(partial);
	}
	return partial(context);
};