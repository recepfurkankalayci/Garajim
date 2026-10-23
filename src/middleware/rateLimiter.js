const rateLimit = require("express-rate-limit");

exports.globalLimitlrt = rateLimit({
    windowMs: 15*60*1000,
    max : 100,
    standartHeaders : true,
    legacyHeaders:false,
    message: {
        succes:false,
        mesaj:'çok fazla istek gönderdiniz lütfen 15 dk sonra tekrar deneyiniz'
    }
});

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    mesaj: 'Çok fazla giriş denemesi yaptınız, hesabınızın güvenliği için 15 dakika bekleyin.'
  }
});