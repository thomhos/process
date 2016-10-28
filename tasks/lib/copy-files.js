var glob                = require('glob-all')
var path                = require('path')
var fs                  = require('fs')
var copy                = require('copy')
var extend              = require('extend')
var mkdirp              = require('mkdirp')

function copyFiles(config, opts) {

    /**
     *  Set the absolute paths for input, output
     */
    var filePaths       = path.resolve(config.input)
    var copyOpts        = { nodir: true }
    var outputDir       = path.resolve(global.output + config.output)

    copy(filePaths, outputDir, copyOpts, function(err, files) {
        if(err) console.error(err)
    })

}

module.exports = copyFiles;
