module.exports = {
    extend: function(standard, options) {
      for(opt in options) {
         standard[opt] = options[opt];
      }
      return standard;
    },
    each: function(obj, func) {
      for(var field in obj) {
         func(obj[field], field);
      }
    },
    filter: function(list, func) {
      var filtered = [];
      list.forEach(function(item) {
        if(func(item)) filtered.push(item);
      });
      return filtered;
    },
    contains: function(list, item) {
      for(var i = 0, l = list.length; i < l; i++) {
        if(list[i] === item) {
          return true;
        }
      }
      return false;
    }
};