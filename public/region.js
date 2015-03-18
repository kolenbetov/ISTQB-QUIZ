function Region(options){
    this.container = document.querySelector(options.el);
}

Region.prototype.set = function(view){
    this.clear();
    if(view){
        this.container.appendChild(view);
    }
};

Region.prototype.clear = function(){
    this.container.innerHTML = "";
};

module.exports = Region;