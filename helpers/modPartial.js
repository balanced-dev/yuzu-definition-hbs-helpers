module.exports = function (path, context, modifier) {
	var partial = handlebars.partials[path];
	if (typeof partial !== 'function') {
		partial = handlebars.compile(partial);
	}
	if(context)
		context['modifier'] = modifier;
	return partial(context);
};