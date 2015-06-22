function makeFormMixin(fields){
    var mixin = {
        getInitialState: function(){
            var state = {};
            fields.forEach(function(field){
                state.field = this.props.field || "";
            }, this);
            return state;
        }
    };

    fields.forEach(function(field){
        var method = camelJoin(["on", field, "change"]);
        mixin[method] = function(e){
            var update = {};
            update[field] = e.target.value;
            this.setState(update);
        }
    });

    return mixin;
};

function camelJoin(parts){
    return parts.map(function(part, i){
        if (i === 0) {
            return part[0].toLowerCase() + part.slice(1);
        }
        else {
            return part[0].toUpperCase() + part.slice(1);
        }
    }).join("");
}

module.exports = makeFormMixin;