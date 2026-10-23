const carsService = require('../services/carsServices');
const asyncHandler = require('../utils/asyncHandler');

exports.aracEkle = asyncHandler(async (req, res, next) => {
    
    const yeniArac = await carsService.aracEkle({
    ...req.body,
    userID: req.user.userId
  });

    res.status(201).json({ 
        success: true, 
        mesaj: 'Araç oluşturuldu.', 
        arac: yeniArac 
    });
});

exports.aracListele = asyncHandler(async (req, res, next) => {
    const araclar = await carsService.aracListele(req.user.userId);
    res.status(200).json({ mesaj: 'Araçlar listelendi', araclar });
});

exports.aracGüncele = asyncHandler(async (req, res, next)=> {
    const guncellenenArac = await carsService.aracGuncelle(req.params.id,req.user.userId, req.body);
    res.status(200).json({ mesaj: 'araç güncellendi', guncellenenArac });
});

exports.aracSil = asyncHandler(async (req, res, next) => {
    const silinenArac = await carsService.aracSil(req.params.id,req.user.userId);
    res.status(200).json({ mesaj: 'araç başarıyla silindi', silinenArac });
});

exports.aracBul = asyncHandler(async (req, res, next) => {
    const filtrelenmisAraclar = await carsService.aracBul(req.user.userId,req.query);
    res.status(200).json({ mesaj: 'araç bulundu', filtrelenmisAraclar });
});

exports.aracGetir = asyncHandler(async (req, res, next) => {
    const arananArac = await carsService.aracGetir(req.params.id,req.user.userId);
    res.status(200).json({ mesaj: 'araç bulundu', arananArac });
});
