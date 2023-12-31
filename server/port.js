const argv = require('./argv.js');

module.exports = parseInt(argv.port || process.env.PORT || '3005', 10);
