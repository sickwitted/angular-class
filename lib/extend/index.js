function extend(target) {
  var args = Array.prototype.splice.call(arguments, 1);
  args = args.filter(function(arg) {
    return arg && arg;
  });
  var arg = args.shift(),
    cstr = arg.constructor.name;
  if (cstr === 'Object') {
    extendObject(target, arg);
  }
  if (args.length) {
    extend.apply(this, [target].concat(args));
  } else {
    return target;
  }
}

function extendObject(target, arg) {
  for (var prop in arg) {
    if (target.hasOwnProperty(prop)) {
      if(/(function|string|number|boolean)/.test( typeof arg[prop])) {
        target[prop] = arg[prop];
      }
      if(typeof arg[prop] === 'object') {
        extend(target[prop], arg[prop]);
      }
    } else {
      Object.defineProperty(target, prop, {
        configurable: true,
        enumerable: true,
        value: arg[prop]
      });
    }
  }
}

module.exports = extend;