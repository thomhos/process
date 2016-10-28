var buildStyles     = require('./lib/build-styles')
var path            = require('path')
var watch           = require('./lib/watch')

function processStyles(config, opts) {

    /**
     *  Build the initial Styles files based on the config provided.
     */
    buildStyles(config, opts)

    /**
     *  If the watcher is enabled, set it to all related files.
     */
    if(opts.watch) {
        var styleFiles  = path.dirname(config.input)

        watch([styleFiles], function() {
            buildStyles(config, opts);
        });
    }
}

module.exports = processStyles;
