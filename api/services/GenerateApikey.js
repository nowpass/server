module.exports = {
    generate: function () {
        var uniqid = require('uniqid');
        var apiKey = uniqid('key-');
        return apiKey;
    }
};
