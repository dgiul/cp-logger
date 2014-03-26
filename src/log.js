/**
 * Titanious.Log
 *
 * Copyright(c) 2014 Jimmy Aupperlee <j.aup.gt@gmail.com>
 *
 * GPLv3 Licensed
 */

/**
 * Current version of the Titanious Log module
 *
 * @type {string}
 */
exports.version = "0.0.2";


exports.options = Object({
    catchAllExceptions : true,
    colors : true,
    append : false,
    sendToScreen : true,
    saveToFile : false,
    fileLocation : "./app.log"
});

/**
 * The constructor function with configuration options.
 *
 * <code>
 * level:
 *
 *      0 : Error only
 *      1 : Notices and Errors
 *      2 : Info, Notices and Errors
 *      3 : All including Debug data
 *
 * options: {
 *
 *      catchAllExceptions : Boolean
 *      default true
 *
 *          Catch all exceptions which will try to stop the application from crashing, but
 *          it might make it harder to debug problems / issues
 *
 *      colors : Boolean
 *      default true
 *
 *          Use colors in the console or not (will be left out in the file)
 *
 *      sendToScreen : Boolean
 *      default true
 *
 *          Sand logs to the stdout to display (the console)
 *
 *      saveToFile : Boolean
 *      default false
 *
 *          Save all logs to a file
 *
 *      filePath : String
 *      default "./app.log"
 *
 *          The location to save the log file to
 *
 * }
 * </code>
 *
 * @param int level The integer which will determine how much
 * will be logged into the file or the stdout.
 *
 * @param options The object of options merged with default
 * options
 */

exports.init = function ( level , options ) {

    // Set the default level if not filled
    level = level || 3;

    if(typeof options == "object") {

        // prepare the options for Object.create
        var opts = {};
        for(var i in options){
            opts[i] = {
                value: options[i],
                enumerable: true,
                writeable: true,
                configurable: true
            }
        };

        // let Object.create merge the options with the defaults
        var options = Object.create(exports.options, opts);

        // bind to this
        for(var o in options){
            this[o] = options[o];
        }

    } else {
        options = exports.options;
    }

    // Return the object with input possibilities
    return new exports.input( level , options );
}

exports.input = require("./input");