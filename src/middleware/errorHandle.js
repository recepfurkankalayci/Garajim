exports.errorHandler = (err,req,res,next)=>{
    const statusCode = err.statusCode||500

    res.status(statusCode).json({
        success:false,
        message: err.message || "Sunucu Hatası",
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}
