var helpers = {};
if (typeof window === 'undefined') {
	var fs = require('fs');
	helpersDir = fs.readdirSync(__dirname +'/helpers/');
	helpersDir.forEach(function(helper) {
		helpers[helper.replace('.js', '')] = require(__dirname +'/helpers/' + helper);
	});	
}

module.exports = helpers;