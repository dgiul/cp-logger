/**
 * CP Logger
 *
 * Copyright(c) 2014 Jimmy Aupperlee <j.aup.gt@gmail.com>
 *
 * GPLv3 Licensed
 */

'use strict';

var fs = require("fs"),
    colors = require("colors"),
    datetime = require("datetime");

/**
 * Set the theme for the color module
 */
colors.setTheme({
    debug : 'grey',
    info: 'green',
    warning: 'yellow',
    error: 'red'
});

/**
 * Export the constructor.
 */
exports = module.exports = Input;

/**
 * The input module object
 *
 * @param level
 * @param options
 * @constructor
 */
function Input( level , options ) {

    var self = this;

    self.level = level;
    self.options = options;

    if(self.options.catchAllExceptions) {

        process.on('uncaughtException', function(err){
            self.error(err);
        });
    }

    if(self.options.saveToFile) {
        // If the log file goes missing, then fix that!
        process.on("SIGHUP", function() {
            // Stop the stream (it reopens automatically)
            self.fileStream.end();
        });
        self.openFileStream();
    }
}

/**
 * Return a formatted date
 */
function getDateTime() {

    var now = new Date();

    var hour = now.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = now.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = now.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var ms  = now.getMilliseconds();

    var year = now.getFullYear();

    var month = now.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = now.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec + "," + ms;

}

Input.prototype.openFileStream = function( ) {

    var self = this;

    self.fileStream = fs.createWriteStream(self.options.filePath,
        {
            flags: ((self.options.append) ? 'a' : 'w'),
            //mode: 644,
            encoding: 'utf8'
        }
    ).on('end', function() {
        self.openFileStream();
    });

    if(!self.fileStream.writable) {
        self.error("The specified file location could not be written to. Feature disabled.");
        self.options.saveToFile = false;
    }
};

/**
 * The insert function which actually shows or puts the
 * string in the file or on screen
 *
 * @param string
 * @param type
 */
Input.prototype.insert = function( string , type ) {

    var s = "[" + type.toUpperCase() + "]", level = 0;

    switch(type) {
        case "warning":
            level = 1;
            break;
        case "info":
            level = 2;
            break;
        case "debug":
            level = 3;
            break;
    }

    s += '[' + getDateTime() + '] ' + string;

    if(level <= this.level) {

        if(this.options.saveToFile) {
            this.fileStream.write(s + '\n');
        }
        if(this.options.sendToScreen) {
            if(this.options.colors) {
                s = s[type];
            }
            process.stdout.write(s + '\n');
        }
    }
};

/**
 * The info level input to be put into the log
 * @param string
 */
Input.prototype.info = function( msg ) {
    this.insert( msg , "info" );
};

/**
 * The debug level input to be put into the log
 * @param string
 */
Input.prototype.debug = function( msg ) {
    this.insert( msg , "debug" );
};

/**
 * The warning level input to be put into the log
 * @param string
 */
Input.prototype.warning = function( msg ) {
    this.insert( msg , "warning" );
};

/**
 * The error level input to be put into the log
 * @param string
 */
Input.prototype.error = function( msg ) {
    this.insert( msg , "error" );
};