module.exports = function (path, context, modifiers) {
	var partial = handlebars.partials[path];
	if (typeof partial !== 'function') {
		partial = handlebars.compile(partial);
	}
	if(context)
		context['_modifiers'] = modifiers;
	return partial(context);
};