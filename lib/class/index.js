(function(definition) {
  "use strict";

  // This file will function properly as a <script> tag, or a module
  // using CommonJS and NodeJS or RequireJS module formats.  In
  // Common/Node/RequireJS, the module exports the Class API and when
  // executed as a simple <script>, it creates a Class global instead.
  // borrowed from  kriskowal's Q

  // Montage Require
  if (typeof bootstrap === "function") {
    bootstrap("promise", definition);
    // CommonJS
  } else if (typeof exports === "object" && typeof module === "object") {
    module.exports = definition();
    // RequireJS
  } else if (typeof define === "function" && define.amd) {
    define(definition);
    // SES (Secure EcmaScript)
  } else if (typeof ses !== "undefined") {
    if (!ses.ok()) {
      return;
    } else {
      ses.makeClass = definition;
    }
    // <script>
  } else if (typeof angular !== 'undefined') {
    angular.module('classjs', []).factory('Class', definition);
  } else if (typeof window !== 'undefined' || typeof self !== 'undefined') {
    // Prefer window over self for add-on scripts. Use self for
    // non-windowed contexts.
    var global = typeof window !== 'undefined' ? window : self;

    // Get the `window` object, save the previous Q global
    // and initialize Q as a global.
    var previousClass = global.Class;
    global.Class = definition();

    // Add a noConflict function so Q can be removed from the
    // global namespace.
    global.Class.noConflict = function() {
      global.Class = previousClass;
      return this;
    };

  } else {
    throw new Error('This environment was not anticipated by classjs. Please file a bug.');
  }

})(function() {
  function extend(target) {
    var args = Array.prototype.splice.call(arguments, 1);
    args = args.filter(function(arg) {
      return arg && arg;
    });
    var arg = args.shift(),
      ctr = arg && arg.constructor.name || false;
    if (ctr === 'Object') {
      extendObject(target, arg);
    }
    if (args.length) {
      return extend.apply(this, [target].concat(args));
    } else {
      return Object.create(target);
    }
  }

  function extendObject(target, arg) {
    for (var prop in arg) {
      if (target.hasOwnProperty(prop)) {
        if (/(string|number|boolean)/.test(typeof arg[prop])) {
          target[prop] = arg[prop];
        }
        if (typeof arg[prop] === 'object') {
          target[prop] = extend(target[prop], arg[prop]);
        }

        if (typeof arg[prop] === 'function') {
          target[prop] = arg[prop];
        }
      } else {
        if (/(string|number|boolean)/.test(typeof arg[prop])) {
          target[prop] = arg[prop];
        }
        if (typeof arg[prop] === 'object') {
          target[prop] = JSON.parse(JSON.stringify(arg[prop]));
        }
        if (typeof arg[prop] === 'function') {
          target[prop] = arg[prop];
        }
      }
    }
  }


  function Class(options) {
    if (!(this instanceof Class)) {
      return new Class(options);
    }

    if (options) {
      extend(this, options);
    }

    if (this.init) {
      this.init.call(this, options);
    }
    return this;
  }

  Class.extend = function() {
    var args = Array.prototype.slice.call(arguments, 0),
      protoDefinition,
      staticsDefinition;

    if (args.length > 1) {
      staticsDefinition = args.shift();
    }

    protoDefinition = args.shift();

    function Surrogate(options) {

      extend(this, Object.create(protoDefinition));

      return Class.prototype.constructor.call(this, options);
    }

    Surrogate.prototype = Object.create(this.prototype);

    extend(Surrogate.prototype, protoDefinition);

    Surrogate.prototype.constructor = Surrogate;

    if (staticsDefinition) {
      Surrogate.__static__ = staticsDefinition;
      extend(Surrogate, this.__static__ || {}, Surrogate.__static__);
    }

    Surrogate.extend = Class.extend.bind(Surrogate);


    return Surrogate;
  };

  return Class;
});