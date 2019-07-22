var Handlebars = require('handlebars');

module.exports = function (path, context) {
	path = path.replace('/','');
	var partial = Handlebars.partials[path];
	if (typeof partial !== 'function') {
		partial = Handlebars.compile(partial);
	}
	return partial(context);
};