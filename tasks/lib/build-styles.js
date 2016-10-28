var stylus              = require('stylus')
var glob                = require('glob-all')
var path                = require('path')
var fs                  = require('fs')
var mkdirp              = require('mkdirp')

function buildStyles(config, opts) {

    /**
     *  Set the absolute paths for input, output
     *  Also generate the site data.
     */
    var stylePaths      = path.resolve(config.input)
    var styleFiles      = glob.sync(stylePaths)
    var outputDir       = path.resolve(global.output + config.output)

    /**
     *  Loop through each path for stylesheet
     */
    styleFiles.forEach(renderCss)

    /**
     *  Render each path with stylus and write output
     */
    function renderCss(sheet) {
        var styleCode   = fs.readFileSync(sheet, 'utf8')
        var outputName  = path.basename(sheet, '.styl')

        stylus(styleCode)
            .include(path.dirname(stylePaths))
            .render(function(err, css) {
                var outputFile = path.resolve(outputDir, outputName + '.css')

                mkdirp.sync(path.dirname(outputFile))

                fs.writeFileSync(outputFile, css)
            })
    }
}

module.exports = buildStyles;
