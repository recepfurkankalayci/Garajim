const authService = require('../services/authServices');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res, next) => {
    const kullanici = await authService.register(req.body);
    res.status(201).json({ mesaj: 'Kayıt başarılı.', kullanici });
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const sonuc = await authService.login(email, password);

    res.status(200).json({
      mesaj: 'Giriş başarılı.',
      kullanici: sonuc.kullanici,
      token: sonuc.token,
    });
});
