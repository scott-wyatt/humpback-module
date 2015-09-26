/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');

Array.prototype.stateUcase = function(){
  for (i=0; i<this.length; i++){
    this[i] = this[i].charAt(0).toUpperCase() + this[i].substring(1);
  }
  return this;
};



/**
 * humpback-module
 *
 * Usage:
 * `sails generate humpback-module MODULE_NAME`
 *
 * @description Generates a humpback-module
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */

  before: function (scope, cb) {

    // scope.args are the raw command line arguments.
    //
    // e.g. if someone runs:
    // $ sails generate humpback-view user find create update
    // then `scope.args` would be `['user', 'find', 'create', 'update']`
    if (!scope.args[0]) {
      return cb( new Error('Please provide a name for this humpback-module.') );
    }

    // scope.rootPath is the base path for this generator
    //
    // e.g. if this generator specified the target:
    // './Foobar.md': { copy: 'Foobar.md' }
    //
    // And someone ran this generator from `/Users/dbowie/sailsStuff`,
    // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
    if (!scope.rootPath) {
      return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    }


    // Attach defaults
    _.defaults(scope, {
      createdAt: new Date()
    });

    var args = scope.args[0].toLowerCase().split('/');
    var foldernameArgs = args.slice(0);
    var statenameArgs = args.slice(0);
    var stateArgs = args.slice(0);

    var filenameOverride = typeof scope.args[1] !== 'undefined' ? scope.args[1].toLowerCase() : null;
    // Decide the output filename for use in targets below:
    //scope.statename = args[args.length - 1];   
    //scope.controllername = args[args.length - 1].charAt(0).toUpperCase() + args[args.length - 1].slice(1);

    scope.filename = filenameOverride ? filenameOverride : (args.length > 1 ? args[args.length - 1] : 'index');
    scope.foldername = foldernameArgs.length > 1 ? foldernameArgs.slice(0, foldernameArgs.length - 1).join('/') + '/' : args + '/';
    scope.statename = statenameArgs.length > 1 ?  statenameArgs.slice(0, statenameArgs.length - 1).stateUcase().join('') : statenameArgs.stateUcase().join('');
    scope.state = stateArgs.length > 1 ?  stateArgs.slice(0, stateArgs.length - 1).join('.') : statenameArgs.join('.');
    // Add other stuff to the scope for use in our templates:
    scope.whatIsThis = 'A humpback-module created at '+scope.createdAt;

    // When finished, we trigger a callback with no error
    // to begin generating files/folders as specified by
    // the `targets` below.

    cb();
  },

  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    // Usage:
    // './path/to/destination.foo': { someHelper: opts }

    // Creates a dynamically-named file relative to `scope.rootPath`
    // (defined by the `filename` scope variable).
    //
    // The `template` helper reads the specified template, making the
    // entire scope available to it (uses underscore/JST/ejs syntax).
    // Then the file is copied into the specified destination (on the left).
    
    './assets/app/views/:foldername:statename.controllers.js': { template: 'controllers.template.js'  },
    './assets/app/views/:foldername:statename.states.js': { template: 'states.template.js'  },

    './views/:foldername:filename.ejs': { template: 'ejs.template.js' }

  },

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};

/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "humback-module":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `humback-module`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}
