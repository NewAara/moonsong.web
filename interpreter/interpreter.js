var Class = require("../util/class"),
    _ = require("../util/_"),
    Node = require("./node"),

Interpreter = Class(function (index) {
    var T = this;
    T.index = index ? index : new Index();
    T.parse = {};
    T.values = {};
  },{
  // Parses a definition
  define: function(text) {
    var T = this,
        parse = T.parse;
    T.prepare_parse();

    // We interate through the letters, building chains that alternate
    // text and parameters
    for(var i = 0, l = text.length; i < l; i++) {
      parse.letter = text[i];
      // When we get to a colon, we switch from the phrase being defined
      // to the definition of that phrase
      if(parse.letter === ':') {
        if(parse.in_parameter) throw "can't use ':' within a parameter"
        if(parse.part === 'definition') throw "can't use more than one ':' in a definition";
        part = "definition";
        if(parse.number_parameters === 0) {
          parse.definition = T.evaluate(text.slice(i));
          return parse;
        }
      } else
      if(parse.letter === '{') {
        if(parse.in_parameter) throw "can't use '{' within a parameter";
        parse.in_parameter = true;
        parse[part].push({
          text: parse.link,
        });
        parse.link = "";
      } else
      if(parse.letter === '}') {    
        if(!parse.in_parameter) throw "need to use '{' before '}'";   
        parse.in_parameter = false;
        var parameter_map = {},
            map_value = parse[parse.part].length,
            map = parse.parameter_map;
        if(map[parse.part]) throw "the same parameter can't be used more than once";
        map[parse.part] = map_value;

        _.extend(parse.parameter_map[parse.link], parameter_map);
        parse[parse.part].push({
          parameter: parse.link,
        });
        ++parse.number_parameters;
        parse.link = "";
      } else {
        parse.link += letter;
      }
    }

    if(parse.part === "phrase") throw "never defined the phrase";
    if(parse.in_parameter) throw "didn't close the last parameter";
    _.each(parse.parameter_map, function(indicies, paramter) {
      if((!indices.definition) || (!indices.phrase)) {
        throw "the '"+parameter+"' wasn't used on both sides"
      }
    });
    if(parse.link.length > 0) {
      parse.definition.push({
        text: parse.link;
      });
    }

    T.index.reset();
    T.index_definition();
    return parse;
  },
  prepare_parse: function() {
      var T = this;
      T.parse = {
        letter: '',
        in_parameter: false,
        phrase: [],
        definition: [],
        part: "phrase",
        node: "";
        parameter_mapping: {};
        number_parameters: 0,
      };
  },
  index_definition: function() {
    var T = this,
        parse = T.parse,
        chain = [];

    // For each part of the phrase, we'll add an entry
    // at the first text phrase with a chain of ids
    // to expect; a positive id indicates we're expecting
    // a text phrase and a negative id indicates we're 
    // expecting a parameter of a certain type
    // 
    // note: each node in the index has a positive id
    parse.phrase.slice(1).forEach(function(link) {
      var is_parameter = !(link.text),
          text = is_parameter ? link.parameter : link.text,
          node = T.index.read(text),
          id = (is_parameter ? -1 : 1) * node.id;
      chain.push(id);
      T.index.reset();
    });
    T.index.read(parse.phrase[0]);
  },
  evaluate: function(text) {
    var T = this,
        threads = [{
          focus: T.root,
        }],
        letter = '';
    // We iterate through the letters until we recognize
    // a definition that expects a parameter; we start a new
    // thread of interpretation to see if the following text
    // satisfies the structure of the definition
    for(var i = 0, l = text.length; i < l; i++) {
      letter = text[i];
      threads.forEach(function(thread) {
        thread.focus = thread.focus.map[letter];

        if() {}
      });
    }

    letter = text[i];
    focus = focus.map[letter];
    if(!focus) {

    }
    if(focus.branches.parameters) {
        var T = this,
          parse = T.parse;
        parse[part].push(parse.node); 
        link = "";
    }
  },
  read: function(text) {
    var T = this;
    if(text[0] === '>') {
      T.evaluate(text.slice(1));
    } else {
      T.define(text);
    }
  },
  addlink: function() {
    var T = this;
  },
});
    return T.focus;
  },
});