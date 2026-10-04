const authService = require('./auth.service');

exports.register = async (req, res) => {
    try {
        const kullanici = await authService.register(req.body);
        res.status(201).json({ mesaj: "Kayıt başarılı.", kullanici });
    } catch (error) {
        res.status(400).json({ hata: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const sonuc = await authService.login(email, password);
        
        res.status(200).json({ 
            mesaj: "Giriş başarılı.", 
            kullanici: sonuc.kullanici,
            token: sonuc.token
        });
    } catch (error) {
        res.status(401).json({ hata: error.message });
    }
};
