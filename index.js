var helpers = {};
helpersDir = fs.readdirSync(__dirname +'/helpers/');
helpersDir.forEach(function(helper) {
	helpers[helper.replace('.js', '')] = require(__dirname +'/helpers/' + helper);
});	

module.exports = helpers;