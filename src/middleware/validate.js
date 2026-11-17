const CostumError = require('../utils/CostumError');

const validate = (schema,source = "body") => {
    return (req,res,next) => {
        try {          
            req.body = schema.parse(req[source]);
            next();
        } catch (error) {

            const errorMessage = error.issues.map(e => e.message).join(' | ');
            next(new CostumError(errorMessage, 400));           
        }
    };
};
module.exports = validate;