const handlebars = require("handlebars");
module.exports = function (path, context, options) {
    let partial,data;
    if (!path) {
        let key = Object.keys(context)[0];
        if (!key)
            return '';
        data = context[key]
        partial = handlebars.partials[key];
    } else {
        data = context;

        path = path.replace('/', '');
        partial = handlebars.partials[path];

    }
    if (typeof data === 'object') {
        if(options) {
            Object.keys(options.hash).forEach(key => {
                data[key] = options.hash[key];
            })
        }else if(context.data.root && typeof context.data.root === 'object')
        {
            data = context.data.root;
            Object.keys(context.hash).forEach(key => {
                data[key] = context.hash[key];
            })
        }
    }
    if (typeof partial !== 'function') {
        partial = handlebars.compile(partial);
    }
    if (!partial)
        return '';

    return partial(data);
};