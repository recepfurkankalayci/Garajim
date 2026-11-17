const CostumError = require('../utils/CostumError');

const adminMiddleware = (req, res, next) => {
    
    if (req.user.role !== 'ADMIN') { 
        return next(new CostumError('Bu işlem için admin yetkisine sahip olmalısınız.', 403));
    }
    next();
};

module.exports = adminMiddleware;