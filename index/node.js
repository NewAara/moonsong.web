var Class = require("../util/class"),

Node = module.exports = Class({
    var T = this;
    T.from = from;
    T.branches = {};
    T.map = {};
    T.count = 0;
},{
    add: function(letter) {
        var T = this,
            next = T.map[letter];
        if(!next) {
            next = T.map[letter] = new Node(T);
        }
        ++next.count;
        return next;
    },
});