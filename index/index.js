var Class = require("../util/class"),

Index = module.exports = Class({
    var T = this;
    T.root = {
      map: {},
      id: 0,
    };
    T.ids = 1;
},{
    find: function(text) {
      var T = this,
          node = T.root;
    
      for(var i = 0, l = text.length; i < l; i++) {
          node = node.seek(text[i]);
          if(!node) return null;
      }
    
      return node
    },
    read: function(text) {
      var T = this,
          node = T.root;
      for(var i = 0, l = text.length; i < l; i++) {
          node = node.add(text[i]);
      }
      return node;
    },
});

