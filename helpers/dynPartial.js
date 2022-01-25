module.exports = function (path, context, options) {
	if (!path) {
		return '';
	} else {
		let data = context;
		if (typeof data === 'object') {
			Object.keys(options.hash).forEach(key => {
				data[key] = options.hash[key];
			})
		}
		path = path.replace('/', '');
		var partial = handlebars.partials[path];
		if (typeof partial !== 'function') {
			partial = handlebars.compile(partial);
		}

		return partial(data);
	}
};