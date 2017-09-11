var Class = require("./class"),
    _ = require("./_"),

List = module.exports = Class(function(generator) {
    var T = this;
    T.generator = generator;
    T.start = null;
    T.end = null;
  },{
    find: function(condition) {
        var T = this,
            node = T.start;
            
        while(node) {
            if(condition(node)) {
                return node;
            }
            node = node.out;
        }
        return null;
    },
    move: function(node, before) {
      var T = this;
      if(node.in) {
        T.link(node.in, node.out);
      } else {
        T.first = node.out;
      }
      if(!node.out && before) {
        T.end = node.in;
      }
      if(before) {
        if(before.in) T.link(before.in, node);
        else T.first = node;
        T.link(node, before);
      } else {
        if(T.end) T.link(T.end, node);
        T.end = node;
      }
    },
    link: function(first, next) {
      first.out = next;
      next.in = first;
    },
    add: function(args, before) {
        var T = this,
            item = {
        node: T.generator(args),
      };
        if(before) {
          if(T.start === before) {
            T.start = item;
        } else {
            T.link(before.in, item);
        }
        T.link(item, before);
        } else {
          var last = T.end;
          T.end = item;
          T.link(last, item);
        }
        if(!T.start) T.start = item;
        if(!T.end) T.end = item;

        return item;
    },
    each: function(f) {
            var n = this.start,
                i = 0;
            while(n) {
              f(n, i++);
              n = n.out;
            }
    },
    create: function(params, before) {
      var T = this,
          id = T.ids++,
          item = new T.generator(params, before),
          node = {
            item: item,
          };
      if(before) {
        T.link(node, before);
        if(before === T.start) {
            T.start = node;
        }
      } else {
          if(T.end) T.link(T.end, node);
          T.end = node;
      }
      
      if(!T.start) T.start = node;
      if(!T.end) T.end = node;

      return node;
    },
  });