const logger = require('../utils/logger');

exports.errorHandler = (err,req,res,next)=>{
    const statusCode = err.statusCode||500

    logger.error(err.message || "sunucu hatası", {
        statusCode : statusCode,
        method: req.method,
        url : req.originalUrl,
        ip : req.ip,
        userId : req.user ? req.user.userId : 'giriş yapılmamış',
        stack : err.stack
    });

    res.status(statusCode).json({
        success:false,
        message: err.message || "Sunucu Hatası",
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
}
