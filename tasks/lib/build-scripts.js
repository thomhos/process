var rollup              = require('rollup')
var glob                = require('glob-all')
var path                = require('path')
var fs                  = require('fs')
var extend              = require('extend');
var mkdirp              = require('mkdirp')

function buildStyles(config, opts) {

    /**
     *  Set the absolute paths for input, output
     *  Also generate the site data.
     */
    var scriptPaths     = path.resolve(config.input)
    var scriptFiles     = glob.sync(scriptPaths)
    var outputDir       = path.resolve(global.output + config.output)
    var rollupConfig    = config.config

    /**
     *  Loop through each path for stylesheet
     */
    scriptFiles.forEach(renderScripts)

    /**
     *  Render each path with stylus and write output
     */
    function renderScripts(script) {
        var outputName      = path.basename(script, '.js')
        var outputFile      = path.resolve(outputDir, outputName + '.js')
        var settings        = extend(true, { entry: script, dest: outputFile }, rollupConfig)

        rollup.rollup(settings).then(function(bundle) {
            bundle.write(settings)
        }, function(err) {
            console.error(err)
        })
    }
}

module.exports = buildStyles;
