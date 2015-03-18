module.exports = function(options){
    var el = document.createElement('div');
    options.children.forEach(function(button){
        el.appendChild(button);
    });
    return el;
}