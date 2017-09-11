var Class = require("../util/class"),
    _ = require("../util/_"),
    Chain = require("./chain"),
    Seam = require("./seam"),
    
Evaluation = module.exports = Class(function(index) {
    var T = this;
    T.fresh();
    T.index = index;
},{
    analyze: function(letter) {
        var T = this,
            root = T.index.root,
            node;
        T.threads.push({
            node: root,
            size: 0,
            link: '',
        });
        T.threads.forEach(function(thread, i) {
            node = thread.node.seek(letter);
            if(!node) {
                delete T.threads[i];
            } else {
                ++thread.size;
                thread.link += letter;
                if(node.value) {
                    T.seam.
                }
            }
        });
    },
    synthesize: function() {
        
    },
    re: function(letter) {
        var T = this,
            thread = {
                chains: [new Chain()],
            };
        thread.in_parameter = (letter === '{');
        thread.link = thread.in_parameter ? '' : letter;
        
        T.threads.push(thread);
    },
    end_parse: function() {
        
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
    branch: function(chain) {
        var T = this;
        if(chain) {}
        else {
            
        }
    },
    fresh: function() {
        var T = this;
        _.extend(T, {
          in_parameter: false,
          chains: [],
          threads: [],
          seam: new Seam();
        })
    },
});