var Class = require("../util/class"),
    _ = require("../util/_"),
    
Chain = module.exports = Class(function() {
    var T = this;
    T.links = [];
},{
    add: function(mode, content, also) {
        var T = this,
            link = {
                mode: mode,
            };
        link[mode] = content;
        if(also) _.extend(link, also);
        
        T.links.push(link);
    },
});