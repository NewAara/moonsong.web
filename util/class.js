var _ = require('./_'),

Class = module.exports = function(init, methods) {
    _.extend(init.prototype, methods);
    return init;
};