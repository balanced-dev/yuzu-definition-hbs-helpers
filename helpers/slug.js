module.exports = function (input) {
    input = input.toLowerCase();
    input = input.replace(/\s/g, "-");
    return input;
};