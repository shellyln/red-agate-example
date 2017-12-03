
function setHeader(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}

module.exports = {
    "server": {
        "baseDir": "debug",
        "routes": {
            "/node_modules": "node_modules",
        },
        "middleware": {
            0: setHeader
        }
    }
}