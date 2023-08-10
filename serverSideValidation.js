const { IOCFormSchema, registerFormSchema, IRFormSchema, AdvisoryFormSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError')

module.exports.validateIOCForm = (req, res, next) => {
    const { error } = IOCFormSchema.validate(req.body);
    if (error || (!req.body.IP && !req.body.URL && !req.body.HASH)) {
        throw new ExpressError('Incident data does not follow a valid format', 400);
    } else {
        next();
    }
}

module.exports.validateRegisterForm = (req, res, next) => {
    const { error } = registerFormSchema.validate(req.body);
    if (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    } else {
        next();
    }
}

module.exports.validateIRForm = (req, res, next) => {
    const { error } = IRFormSchema.validate(req.body);
    if (error || (!req.body.IP && !req.body.URL)) {
        throw new ExpressError('Incident data does not follow a valid format', 400);
    } else {
        next();
    }
}

module.exports.validateAdvisoryForm = (req, res, next) => {
    const { error } = AdvisoryFormSchema.validate(req.body);
    if (error) {
        throw new ExpressError('Incident data does not follow a valid format', 400);
    } else {
        next();
    }
}