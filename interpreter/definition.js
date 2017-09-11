var Class = require("../util/class"),
    Template = require("./template"),
    Evaluation = require("./evaluation"),
    

Definition = module.exports = Class(function() {
  var T = this;
},{
  parse: function(text) {
    var T = this,
        parser = {
          0: new Template(),
          1: new Evaluation(),
        },
        side = 0,
        letter = '',
        evaluation = parser[1], 
        template = parser[0];
    
    for(var i = 0, l = text.length; i < l; i++) {
      letter = text[i];
      if(letter === ':') {
        ++side;
        if(side > 1) throw "can only have one ':' per definition";
      } else {
        parser[side].add(letter);
      }
    }
    
    if(T.side === 0) throw "never defined the words";
        
    evaluation.chain.forEach(function(link) {
      if(link.mode === "parameter") {
        var type = template.parameter_map[link.name].type;
        if(type) { 
          if(type != link.type) throw "the parameter {"+link.name+"} is used for more than one type";
        } else {
          template.parameter_map[link.name].type = link.type;
        }
      }    
    });
  },

});