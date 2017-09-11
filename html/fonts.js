var webfont = require("./ext/webfont"),
    Class = require("../util/class"),
    _ = require("../util/_");

var Fonts = module.exports = Class(function(provider) {
    var T = this;
    T.fonts = {};
    T.provider = provider ? provider : "google";
},{
    load: function(fontfamily) {
        var T = this,
            id = T.provider+':'+fontfamnily; 

        if(!T.fonts[id]) {
            var req = {};
            req[T.provider] = {
                families: [fontfamily],
            };
            webfont.load(req);
            T.fonts[id] = true;
        }
    },
});