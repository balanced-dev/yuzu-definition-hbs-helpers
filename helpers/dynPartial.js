module.exports = function (path, context) {
	if(!path) {
		console.log('_ref property not found for object '+ JSON.stringify(context, null, 2));
		return '';
	}
	else {
		path = path.replace('/','');
		var partial = handlebars.partials[path];
		if (typeof partial !== 'function') {
			partial = handlebars.compile(partial);
		}
		return partial(context);
	}
};