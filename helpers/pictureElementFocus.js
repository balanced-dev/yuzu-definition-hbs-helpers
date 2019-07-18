var picture = require('./pictureHelpers.js');

module.exports = function (src, alt, focalPoint, classes, fallbackSize) {	

// Collect extra params (breakpoints)
// Length - 1 as last param is a HBS object
var args = Array.prototype.slice.call(arguments),
	breakpointArgs = args.slice(5, args.length -1);

var sources = picture.buildSourcesObj(breakpointArgs);		
return picture.element(src, alt, focalPoint, classes, sources, fallbackSize);
};
