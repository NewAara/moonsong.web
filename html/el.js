var Class = require("../util/class"),
    _ = require("../util/_"),
    events = require("./events"),

El = module.exports = Class(function(html, opts) {
  var T = this;
  T.el = (typeof html === "string" || !html) ? 
      (html && html[0] === '#') ? 
          document.getElementById(html.substring(1)) :
          document.createElement(html ? html : "div")
      : (html instanceof El) ? html.el : html;

  _.each(opts, function(val, opt) {
    if(typeof T[opt] === "function") T[opt](val);
  });
},{
  attr: function(attrs) {
    var T = this;
    console.log("attr",T);
    _.each(attrs, function(a, name) {
      T.el.setAttribute(name, a);
    });
  },
  id: function(id) {
    this.attr({id:id});
  },
  into: function(el, before) {
    var tel = new El(el);
    tel.insert(this.el, before);
    return tel;
  },
  insert: function(other, before) {
    var T = this,
        other_el = new El(other);
      if(before) {
        var bel = new El(before);
        T.el.insertBefore(other_el.el, bel.el);
      } else {
        T.el.appendChild(other_el.el);
      }
      other_el.up = T;
      return other_el;
    },
    addClass: function(cl) {
      this.el.className += ' '+cl;
    },
    removeClass: function(cl) {
      var T = this,
          classes = _.filter(T.el.className.split(' '), function(name) {
            return name !== cl;  
          });
      T.el.className = classes.join(' ');
    },
    toggleClass: function(cl) {
      var T = this,
        classes = T.el.className.split(' ');
      if(_.contains(classes, cl)) {
        T.removeClass(cl);
      } else {
        T.addClass(cl);            
      }
    },
    placeholder: function(text) {
      this.attr({"data-placeholder": text});
    },
    editable: function(is) {
      if(is) this.attr({contenteditable:"true"});
    },
    html: function(html) {
      this.el.innerHTML = html;
    },
    style: function(styles) {
      _.extend(this.el.style, styles);
    },
    on: function(eventmap) {
      var T = this;
      _.each(eventmap, function(handler, trigger) {
       events(T.el, trigger, handler);     
      });
    },
    width: function() { return this.el.offsetWidth; },
    height: function() { return this.el.offsetHeight; },
    rect: function() { return this.el.getBoundingClientRect(); },
    get: function(style) { return this.el.style[style]; },
});