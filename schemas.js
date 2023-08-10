const Joi = require('joi');

module.exports.IOCFormSchema = Joi.object({
    type: Joi.string().valid('IOC').required(),
    agency: Joi.string(),
    referenceId: Joi.string().required(),
    TLP: Joi.string().required(),
    confidence: Joi.string().required(),
    risk: Joi.string().required(),
    details: Joi.string().required(),
    IP: Joi.string().allow(''),
    URL: Joi.string().allow(''),
    HASH: Joi.string().allow('')
})

module.exports.IRFormSchema = Joi.object({
    type: Joi.string().valid('IR').required(),
    Type: Joi.string().required(),
    IP: Joi.string().allow(''),
    URL: Joi.string().allow(''),
    details: Joi.string().required()
})

module.exports.AdvisoryFormSchema = Joi.object({
    type: Joi.string().valid('Advisory').required(),
    agency: Joi.string().required(),
    referenceId: Joi.string().required(),
    title: Joi.string().required(),
    details: Joi.string().required()
})

module.exports.registerFormSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    agency: Joi.string().required()
})

