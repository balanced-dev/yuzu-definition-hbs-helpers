var picture = require('./pictureHelpers.js');

module.exports = function (src) {	

	// Collect extra params (breakpoints)
	// Length - 1 as last param is a HBS object
	var args = Array.prototype.slice.call(arguments),
		breakpointArgs = args.slice(1, args.length -1);

	var sources = picture.buildSourcesObj(breakpointArgs);		
	return picture.attributes(src, sources);
};
