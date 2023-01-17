const should = require("should");
const rewire = require('rewire');
const helper = require('../../helpers/dynPartial.js')
handlebars = require('handlebars')


describe('dynPartial', function () {
    handlebars.registerHelper('dynPartial', helper)
    
    it('given empty path and context', function (done) {

        let source = "{{{dynPartial '' foo}}}";
        let partialSource = "test {{bar}}";
        let data = {  foo: {partialName:{bar: "bar"}}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar")
        done()
    });
    
    it('given ref as path and context', function (done) {

        let source = "{{{dynPartial foo._ref foo}}}";
        let partialSource = "test {{bar}}";
        let data = {  foo: {bar: "bar", "_ref": "/partialName"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar")
        done()
    });

    it('given empty path, context and parameter', function (done) {

        let source = "{{{dynPartial '' foo param='test'}}}";
        let partialSource = "test {{bar}} {{param}}";
        let data = {  foo: {partialName:{bar: "bar"}}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar test")
        done()
    });

    it('given empty path and context is array', function (done) {

        let source = "{{{dynPartial '' foo}}}";
        let partialSource = "test {{#each this}}{{this.bar}}{{/each}}";
        let data = {  foo: {partialName:[{bar: "bar"}]}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar")
        done()
    });

    it('given path and context where context is an object', function (done) {
        let source = "{{{dynPartial 'partialName' foo}}}";
        let partialSource = "test {{bar}}";
        let data = {foo: {bar: "bar"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);

        template(data).should.be.exactly("test bar")
        done()
    });

    describe('given contexts of different data types', function(done) {
        let runs = [
            {
                it:"string", data: "test"
            },
            {
                it:"number", data: 12
            },
            {
                it:"decimal", data: 12.0
            },
            {
                it:"char", data: 'f'
            }
        ];
        
        runs.forEach(function (run) {
            it('type is: ' + it, function (done) {
                let source = "{{{dynPartial 'partialName' foo}}}";
                let partialSource = "test {{this}}";
                let data = {foo: run.data };

                handlebars.registerPartial('partialName', partialSource)

                let template = handlebars.compile(source);

                template(data).should.be.exactly("test " + run.data)
                done()
            });
        })
    })


    it('given path, context and parameter', function (done) {
        let source = "{{{dynPartial 'partialName' foo param='test'}}}";
        let partialSource = "test {{bar}} {{param}}";
        let data = {foo: {bar: "bar"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);

        template(data).should.be.exactly("test bar test")
        done()
    });

    it('given multiple renders, with paths, different contexts and parameters', function (done) {
        let source = "{{{dynPartial 'partialName' foo param='example'}}} {{{dynPartial 'partialName' foo2}}}";
        let partialSource = "test {{bar}} {{param}}";
        let data = {foo: {bar: "bar"}, foo2: {bar: "bar2"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);

        template(data).should.be.exactly("test bar example test bar2 ")
        done()
    });

    it('given path, context and multiple parameter', function (done) {
        let source = "{{{dynPartial 'partialName' foo param1='test' param2='test again'}}}";
        let partialSource = "test {{bar}} {{param1}} {{param2}}";
        let data = {foo: {bar: "bar"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);

        template(data).should.be.exactly("test bar test test again")
        done()
    });

    it('given path and no context', function (done) {
        let source = "{{{dynPartial 'partialName'}}}";
        let partialSource = "test {{foo.bar}}";
        let data = {foo: {bar: "bar"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);

        template(data).should.be.exactly("test bar")
        done()
    });

    it('given path and no context with parameter', function (done) {
        let source = "{{{dynPartial 'partialName' param='test'}}}";
        let partialSource = "test {{foo.bar}} {{param}}";
        let data = {foo: {bar: "bar"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);

        template(data).should.be.exactly("test bar test")
        done()
    });
});