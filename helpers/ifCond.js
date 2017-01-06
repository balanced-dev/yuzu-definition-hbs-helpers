/*http://bdadam.com/blog/comparison-helper-for-handlebars.html*/
//(function () {
function checkCondition(v1, operator, v2) {
	switch (operator) {
		case '==':
			return (v1 == v2);
		case '===':
			return (v1 === v2);
		case '!==':
			return (v1 !== v2);
		case '<':
			return (v1 < v2);
		case '<=':
			return (v1 <= v2);
		case '>':
			return (v1 > v2);
		case '>=':
			return (v1 >= v2);
		case '&&':
			return (v1 && v2);
		case '||':
			return (v1 || v2);
		default:
			return false;
	}
}

module.exports = function ifCond(v1, operator, v2, options) {
                return checkCondition(v1, operator, v2)
                    ? options.fn(this)
                    : options.inverse(this);
			};