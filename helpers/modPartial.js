var Handlebars = require('handlebars');

module.exports = function (path, context, modifier) {
				var partial = Handlebars.partials[path];
  				if (typeof partial !== 'function') {
    				partial = Handlebars.compile(partial);
  				}
				context['modifier'] = modifier;
  				return partial(context);
			};