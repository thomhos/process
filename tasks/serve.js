var bs = require('browser-sync').create()

function serve(path) {

    bs.watch(path).on('change', function() {
        bs.reload();
    });

    bs.init({
        server: path
    })

}

module.exports = serve;
