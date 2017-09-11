var El = require("./el"),
    Fonts = require("./fonts"),
    _ = require("../util/_"),
    Class = require("../util/class"),

Editor = module.exports = Class(function(root) {
    var T = this;
    T.root = root;
    T.fonts = new Fonts();
    _.each("Lustria,Cinzel,Josefin Sans".split(','), function(font) {
        T.fonts.load(font);
    });
    
    T.el = new El("div", {
        into: root,
        html: "hi",
        addClass: "template",
    });

});