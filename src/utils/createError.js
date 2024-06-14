const createError = require('http-errors');

module.exports = {
    NotFound: (message) => createError(404, message),
    BadRequest: (message) => createError(400, message),
    UnAuthorized: (message) => createError(401, message)
}