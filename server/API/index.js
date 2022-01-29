let GET = require('./GET/index.js');

exports.init = (app) => {
    GET.Hello("/hello", app);
}