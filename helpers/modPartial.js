const handlebars = require("handlebars");
module.exports = function (path, context, options) {
    let partial, data;
    if (!path) {
        let key = Object.keys(context)[0];
        partial = handlebars.partials[key]
        data = context[key];
    } else {
        path = path.replace('/', '');
        partial = handlebars.partials[path];
        data = context;
    }
    if (typeof partial !== 'function') {
        partial = handlebars.compile(partial);
    }

    if (context) {
        // Assume every parameter after path + context are modifier classes (excluding last = options object)
        context._modifiers = Array.prototype.slice.call(arguments, 2, -1);
    }

    // Assume that last parameter is an options object
    let hash = arguments[arguments.length - 1].hash;

    if (typeof data === 'object') {
        Object.keys(hash).forEach(key => {
            data[key] = hash[key];
        })
    }
    return partial(data);
}
