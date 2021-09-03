module.exports = function (path, context, scope) {
	path = path.replace('/','');
	var partial = handlebars.markup[path];

	if(!partial) {
		throw new Error(`Static Partial ${path} not found in static partial hbs helper`);
	}
	else {
		if(scope) {
			if(context._endpoint) {
				partial = partial.replace(/<\w*\s/, '$&data-endpoint=\''+ context._endpoint +'\' ');
			}
			else if (context) {
				let stringContext = JSON.stringify(context);
				stringContext = stringContext.replace(/'/g, "&#39;");
				partial = partial.replace(/<\w*\s/, '$&data-context=\''+ stringContext +'\' ');
			}
		}
	}

	return partial;
};