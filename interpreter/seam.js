var Class = require("../util/class"),
    _ = require("../util/_"),
    List = require("../util/list"),

Seam = module.exports = Class(function(size) {
        var T = this;
        T.places = new Array(size);
    },{
        thread: function(start, content, end) {
            var T = this,
                slot = T.places[start];
            if(!slot) {
                slot = T.places[start] = new List(function(params) {
                    return params;
                });
            }
            return slot.add(_.extend({
               start: start,
               end: end,
            }, content);
        },
    });