module.exports = function (path, context, scope) {
	path = path.replace('/','');
	var partial = handlebars.markup[path];

	if(scope) {
		if(context._endpoint) {
			partial = partial.replace(/<\w*\s/, '$&data-endpoint=\''+ context._endpoint +'\' ');
		}
		else if (context) {
			partial = partial.replace(/<\w*\s/, '$&data-context=\''+ JSON.stringify(context) +'\' ');
		}
	}

	return partial;
};