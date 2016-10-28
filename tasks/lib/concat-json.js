var glob                = require('glob-all');
var path                = require('path');
var fs                  = require('fs');
var extend              = require('extend');

function concatJson(dir) {

    /**
     *  Collect all the paths for the site specific json.
     */
    var commonJsonPaths = glob.sync(path.resolve(dir)) || [];
    var result          = {};

    commonJsonPaths.forEach(concatSiteData)

    function concatSiteData(p) {
        var key     = path.basename(p, '.json');
        var data    = {};

        data[key]   = JSON.parse(fs.readFileSync(p, 'utf8'));

        extend(true, result, data);
    }

    return result;

}

module.exports = concatJson;
