var copyFiles       = require('./lib/copy-files')
var path            = require('path')
var watch           = require('./lib/watch')

function processCopy(config, opts) {

    /**
     *  Build the initial Styles files based on the config provided.
     */
    copyFiles(config, opts)

    /**
     *  If the watcher is enabled, set it to all related files.
     */
    if(opts.watch) {
        var filesToCopy  = path.dirname(config.input)

        watch([filesToCopy], function() {
            copyFiles(config, opts);
        });
    }
}

module.exports = processCopy;
