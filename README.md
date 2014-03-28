![codeProgressive logo](http://codeprogressive.com/application/assets/images/logo_inverse.svg)

cpLogger
========

A tiny lightweight logger module used by many codeProgressive projects. The logger is designed to easily log on different levels such as; 'error' and 'warning'.
It also gives the option to write the log to a file in a descent manner. A timestamp will automatically be included for your convenience.

Installation
------------

    $ npm install cpLogger

Usage
------------
Instantiate and initialize the logger module.

    var log = require( 'cpLogger' ).init( <level> , <options> )


*Both parameters are optional.*

The __level__ parameter is a number from 0 to 3 defining the maximum level of logs to be shown. This way, when using different environments,
you can set the level accordingly. When set to 0, only errors will be shown and when set to 3; all logs will be shown.

The __options__ parameter is optional but when used, should be an object containing overrides to the options which are set by default.

After initializing you can easily log messages using the following methods:

### Debug information
Will be used when the log level set equals 3

    log.debug( "This is some debug information" );

### General information
Will be used when the log level set equals 2 or higher

    log.info( "This is some information" );

### Warning
Will be used when the log level set equals 1 or higher

    log.warning( "This is a warning" );

### Error
    log.error( "This is an error" );

### Example
Here is an example on how to initialize the logger


Options
------------
The options object can override each of the following options;

- __catchAllExceptions__ : Boolean (default : __false__)
     - __WARNING: Do not use this option!__ Catch all exceptions which will try to stop the application from crashing. Will likely cause instability
     as your application will probably not know what to do after triggering an exception.

- __colors__ : Boolean (default __true__)
    - Enable or disable colors in the console.

- __sendToScreen__ : Boolean (default __true__)
    - Send the logs to the stdout (the console), because maybe you only want to write to a log file and not show them in the console.

- __saveToFile__ : Boolean (default __false__)
    - Save all logs to the file specified in the __filePath__ option.

- __filePath__ : String (default __"./app.log"__)
    - If the __saveToFile__ option is enabled, this is the file which will be written to when logging.

License 
-------

GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007