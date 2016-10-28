var path        = require('path')
var buildHtml   = require('./lib/build-html')
var watch       = require('./lib/watch')

function processHtml(config, opts) {

    /**
     *  Build the initial HTML files based on the config provided.
     */
    buildHtml(config, opts)

    /**
     *  If the watcher is enabled, set it to all related files.
     */
    if(opts.watch) {
        var pageData    = path.resolve(config.pages)
        var siteData    = path.resolve(config.site)
        var templates   = path.resolve(config.templates)

        watch([pageData, siteData, templates], function() {
            buildHtml(config, opts);
        });
    }
}

module.exports = processHtml
