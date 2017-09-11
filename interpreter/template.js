var Class = require("../util/class"),
    _ = require("../util/_"),
    Chain = require("./chain"),

Template = module.exports = Class(function(handlers) {
    var T = this;
    T.fresh();
    T.handlers = _.extend({
      '{': "open_parameter",
      '}': "close_parameter",
    }, handlers);
},{
    add: function(letter) {
      var T = this,
          handler = T.handlers[letter];
      if(handler) T[handler](); else 
      {
        T.link += letter;
      }
    },
    end_parse: function() {
      var T = this;
      T.validate_parse();
  
      // cleanup in case we have a little leftover
      if(T.link.length > 0) {
        T.chain.add("text", T.link);
      }
    },
    fresh: function() {
       var T = this;
       _.extend(T, {
          in_parameter: false,
          chain: new Chain(),
          link: "",
          parameter_map: {},
          number_parameters: 0,
      });
    },
    parse: function(text) {
      var T = this;
      // We interate through the letters, building chains that alternate
      // text and parameters
      for(var i = 0, l = text.length; i < l; i++) {
        T.add(text[i]);
      }
  
      T.end_parse();
    },
    open_parameter: function() {
        var T = this;
        if(T.in_parameter) throw "can't use '{' within a parameter";
        T.in_parameter = true;
        T.chain.add("text", T.link);
        T.link = "";
    },
    close_parameter: function() {
        var T = this;
        if(!T.in_parameter) throw "need to use '{' before '}'";   
        T.in_parameter = false;

        if(T.parameter_map[T.link]) throw "the same parameter can't be used more than once";
        T.parameter_map[T.link] = {
          index: T.chain.length,
        };
        T.chain.add("parameter", T.link);
        ++T.number_parameters;
        T.link = ""; 
    },
    validate_parse: function() {
        var T = this;

        if(T.in_parameter) throw "didn't close the last parameter";
        _.each(T.parameter_map, function(indicies, paramter) {
          if((!indices.definition) || (!indices.phrase)) {
            throw "{"+parameter+"} wasn't used on both sides"
          }
        });
    },
});
