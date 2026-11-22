const CostumError = require('../utils/CostumError');

exports.validate = (schema,source = "body") => {
    return (req,res,next) => {
        try {          
            req.body = schema.parse(req[source]);
            next();
        } catch (error) {

            const issues = Array.isArray(error?.issues) ? error.issues : [];
            const errorMessage = issues.length > 0
                ? issues.map(e => e.message).join(' | ')
                : error?.message || 'Geçersiz veri.';
            next(new CostumError(errorMessage, 400));           
        }
    };
};
