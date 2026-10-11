const careService = require('../services/careServices');
const asyncHandler = require('../utils/asyncHandler');

exports.bakimolustur = asyncHandler(async (req, res, next)=> {
    const yeniBakim = await careService.bakimEkle(req.body);
    res.status(200).json({ mesaj: 'bakım oluşturuldu', yeniBakim });
});

exports.bakimsil = asyncHandler(async (req, res, next)=> {
    const silinenbakim = await careService.bakimSil(req.params.id);
    res.status(200).json({ mesaj: 'bakım silindi', silinenbakim });
});

exports.bakimguncelle = asyncHandler(async (req, res, next)=> {
    const guncellenenBakim = await careService.bakimGuncelle(req.params.id, req.body);
    res.status(200).json({ mesaj: 'bakım güncellendi', guncellenenBakim });
});

exports.bakimListele = asyncHandler(async (req, res, next) => {
  
    const bakimlar = await careService.bakimListele();
    res.status(200).json({ mesaj: 'bakımlar listelendi', bakimlar });
});

exports.bakimFiltrele = asyncHandler(async (req, res, next)=> {
    const filtrelenmisListe = await careService.bakimBul(req.query);
    res.status(200).json({ mesaj: 'bakımlar filtelendi', filtrelenmisListe });
});

exports.bakimGetir = asyncHandler(async (req, res, next)=> {
    const bakim = await careService.bakimGetir(req.params.id);
    res.status(200).json({ mesaj: 'bakım bulundu', bakim });
});
