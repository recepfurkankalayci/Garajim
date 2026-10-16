const { ne } = require('zod/v4/locales');
const CostumError = require('../utils/CostumError');

const validate = (schema) => {
    return (req,res,next) => {
        try {
            
            req.body = schema.parse(req.body);

            next();
        } catch (error) {

            const errorMessage = error.issues.map(e => e.message).join(' | ');
            
            
            next(new CostumError(errorMessage, 400));
            
        }
    };
};

module.exports = validate;