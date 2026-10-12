const CustomError = require('../utils/CustomError');

const validate = (schema) => {
    return (req,res,next) => {
        try {
            
            req.body =schema.parse(req.body);

            next();
        } catch (error) {

            const errorMessage = error.errors.map(e => e.message).join(' | ');
            
            
            next(new CustomError(errorMessage, 400));
        }
    };
};

module.exports = validate;