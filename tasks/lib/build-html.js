var nunjucks            = require('nunjucks');
var concatJson          = require('./concat-json');
var glob                = require('glob-all');
var path                = require('path');
var fs                  = require('fs');
var mkdirp              = require('mkdirp');

function buildHtml(config, opts) {

    /**
     *  Set the absolute paths for input, output
     *  Also generate the site data.
     */
    var pages           = path.resolve(config.pages)
    var inputDir        = path.resolve(config.templates)
    var outputDir       = path.resolve(global.output)
    var siteData        = concatJson(config.site)
    var pageFiles       = glob.sync(pages)

    /**
     *  Configure nunjucks with the correct directory
     */
    nunjucks.configure(inputDir, {
        trimBlocks: true,
        lstripBlocks: true,
        noCache: true
    })

    /**
     *  Loop through each json file and render a page from it
     */
    pageFiles.forEach(renderPage)


    /**
     *  Render a page from the page specific json, and the site wide json.
     *  output it in the outputDir from the config.
     */
    function renderPage(page) {
        var pageName        = path.basename(page, '.json')
        var pageData        = JSON.parse(fs.readFileSync(page, 'utf8'))
        var templateName    = pageData.template + config.extension
        var templateFile    = path.resolve(inputDir, templateName)
        var fullData        = { page: pageData, site: siteData }

        nunjucks.render(templateFile, fullData, function (err, res) {
            if (err) return console.error(err)

            var outputFile = path.resolve(outputDir, pageName + '.html')

            mkdirp.sync(path.dirname(outputFile))

            fs.writeFileSync(outputFile, res)
        });
    }
}

module.exports = buildHtml;
