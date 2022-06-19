const should = require("should");
const rewire = require('rewire');
const helper = require('../../helpers/modPartial.js')
handlebars = require('handlebars')


describe('modPartial', function () {
    handlebars.registerHelper('modPartial', helper)
    
    it('given empty path and context', function (done) {

        let source = "{{{modPartial '' foo}}}";
        let partialSource = "test {{bar}}";
        let data = {  foo: {partialName:{bar: "bar"}}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar")
        done()
    });

    it('given ref as path and context', function (done) {

        let source = "{{{modPartial foo._ref foo ''}}}";
        let partialSource = "test {{bar}}";
        let data = {  foo: {bar: "bar", "_ref": "/partialName"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar")
        done()
    });
    
    it('given empty path, context and parameter', function (done) {

        let source = "{{{modPartial '' foo param='test'}}}";
        let partialSource = "test {{bar}} {{param}}";
        let data = {  foo: {partialName:{bar: "bar"}}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar test")
        done()
    });

    it('given empty path and context is array', function (done) {

        let source = "{{{modPartial '' foo}}}";
        let partialSource = "test {{#each this}}{{this.bar}}{{/each}}";
        let data = {  foo: {partialName:[{bar: "bar"}]}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar")
        done()
    });
    it('given path and context where context is an object and modifiers is empty', function (done) {

        let source = "{{{modPartial 'partialName' foo ''}}}";
        let partialSource = "test {{bar}}";
        let data = {  foo: {bar: "bar"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar")
        done()
    });
    it('given path context and parameter', function (done) {

        let source = "{{{modPartial 'partialName' foo param='test'}}}";
        let partialSource = "test {{bar}} {{param}}";
        let data = {  foo: {bar: "bar"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar test")
        done()
    });

    it('given path context and multiple parameters', function (done) {

        let source = "{{{modPartial 'partialName' foo param1='test' param2='test again'}}}";
        let partialSource = "test {{bar}} {{param1}} {{param2}}";
        let data = {  foo: {bar: "bar"}};

        handlebars.registerPartial('partialName', partialSource)

        let template = handlebars.compile(source);
        template(data).should.be.exactly("test bar test test again")
        done()
    });
});