const Validation = (validationFunc) => (req, res, next) => {
    // console.log("validation", req.body);
    const {error} = validationFunc(req.body);
    if(error) next(error);
    next();
}

module.exports = Validation;