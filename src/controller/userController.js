const userService = require('../services/userServices');
const asyncHandler = require('../utils/asyncHandler');

exports.kullaniciolustur = asyncHandler(async (req, res, next)=> {
    const yeniKullanici = await userService.userEkle(req.body,req.user.userId);
    res.status(201).json({ mesaj: 'kullanıcı oluşturuldu', yeniKullanici });
});

exports.kullaniciSil = asyncHandler(async (req, res, next)=> {

    const silinenKullanici = await userService.userSil(req.params.id,req.user.userId);
    res.status(200).json({ mesaj: 'kullanıcı silindi', silinenKullanici });
});

exports.kullaniciListele = asyncHandler(async (req, res, next) => {
    const kullanicilar = await userService.userListele(req.user.userId);
    res.status(200).json({ mesaj: 'kullanıcılar listelendi', kullanicilar });
});

exports.kulaniciGüncelle = asyncHandler(async (req, res, next)=> {
    const guncellenenKullanici = await userService.userGuncelle(req.params.id,req.user.userId, req.body);
    res.status(200).json({ mesaj: 'kullanıcı güncellendi', guncellenenKullanici });
});

exports.kullaniciFiltrele = asyncHandler(async (req, res, next)=> {
    const filtrelenmisKullanicilar = await userService.userBul(req.query,req.user.userId);
    res.status(200).json({ mesaj: 'kullanıcılar filtrelendi', filtrelenmisKullanicilar });
});

exports.kullaniciGetir = asyncHandler(async (req, res, next)=> {
    const kullanici = await userService.userGetir(req.params.id,req.user.userId);
    res.status(200).json({ mesaj: 'Kullanıcı bulundu.', kullanici });
});