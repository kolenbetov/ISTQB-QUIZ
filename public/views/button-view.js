var $ = require('jquery');
var btnTpl = require('../templates/button.hbs');

module.exports = function(options) {
    options = options || {};

    var el = $(btnTpl(options.data)).get(0);
    el.addEventListener('click', options.onClick);
    return el;
}