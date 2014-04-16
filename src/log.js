/**
 * CP Logger
 *
 * Copyright(c) 2014 Jimmy Aupperlee <j.aup.gt@gmail.com>
 *
 * GPLv3 Licensed
 */

'use strict';

/**
 * Current version of the Titanious Log module
 *
 * @type {string}
 */
exports.version = "0.0.5";

exports.options = Object({
    catchAllExceptions : false,
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
 *      default false
 *
 *          WARNING: Do not use this option! Catch all exceptions which will try to stop the application from crashing. Will likely cause instability
 *          as your application will probably not know what to do after triggering an exception.
 *
 *      colors : Boolean
 *      default true
 *
 *          Enable or disable colors in the console
 *
 *      sendToScreen : Boolean
 *      default true
 *
 *          Send the logs to the stdout (the console), because maybe you only want to write to a log file and not show them in the console.
 *
 *      saveToFile : Boolean
 *      default false
 *
 *          Save all logs to the file specified in the filePath option.
 *
 *      filePath : String
 *      default "./app.log"
 *
 *          If the saveToFile option is enabled, this is the file which will be written to when logging.
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
    level = parseInt(level, 10) || 3;

    if(typeof options === "object") {

        // prepare the options for Object.create
        var opts = {};
        for(var i in options){
            opts[i] = {
                value: options[i],
                enumerable: true,
                writeable: true,
                configurable: true
            };
        }

        // let Object.create merge the options with the defaults
        options = Object.create(exports.options, opts);

        // bind to this
        for(var o in options){
            this[o] = options[o];
        }

    } else {
        options = exports.options;
    }

    // Return the object with input possibilities
    return new exports.input( level , options );
};

exports.input = require("./input");