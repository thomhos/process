var chokidar = require('chokidar')

function watch(path, callback) {
    var watcher = chokidar.watch(path, {
        persistent: true,
        ignoreInitial: true
    })

    watcher.on('add', callback)
    watcher.on('change', callback)
}

module.exports = watch
