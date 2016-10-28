var buildScripts     = require('./lib/build-scripts')
var path            = require('path')
var watch           = require('./lib/watch')

function processScripts(config, opts) {

    /**
     *  Build the initial Styles files based on the config provided.
     */
    buildScripts(config, opts)

    /**
     *  If the watcher is enabled, set it to all related files.
     */
    if(opts.watch) {
        var styleFiles  = path.dirname(config.input)

        watch([styleFiles], function() {
            buildScripts(config, opts);
        });
    }
}

module.exports = processScripts;
