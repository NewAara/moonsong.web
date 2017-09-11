var Editor = require("./html/editor");

console.log("hello");

window.editor = new Editor("#root");

_.each("El,_,Editor".split(','), function(module){
    window[module] = eval(module);
});