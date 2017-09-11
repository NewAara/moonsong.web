var _ = require("../util/_"),
    jwerty = require("./ext/jwerty").jwerty;

// add other events as needed
var std_events = [
    "click","dblclick",
    "mousedown","mouseup","mousemove","mouseover","mouseleave",
    "dragstart","dragover","drop",
    "keyup", "keydown", "keypress",
];

module.exports = function(elem, trigger, handler) {
    if(_.contains(std_events, trigger)) {
        elem.addEventListener(trigger, handler.bind(elem));
    } else {
        jwerty.key(trigger, handler, elem);
    }
}