const userService = require('../services/userServices');

exports.kullaniciolustur = async (req, res) => {
  try {
    const yeniKullanici = await userService.userEkle(req.body);
    res.status(201).json({ mesaj: 'kullanıcı oluşturuldu', yeniKullanici });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mesaj: 'kullanıcı oluşturulamadı' });
  }
};

exports.kullaniciSil = async (req, res) => {
  try {
    const silinenKullanici = await userService.userSil(req.params.id);
    res.status(200).json({ mesaj: 'kullanıcı silindi', silinenKullanici });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mesaj: 'kullanıcı silinemedi' });
  }
};

exports.kullaniciListele = async (_, res) => {
  try {
    const kullanicilar = await userService.userListele();
    res.status(200).json({ mesaj: 'kullanıcılar listelendi', kullanicilar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mesaj: 'kullanıcılar listelenemedi' });
  }
};

exports.kulaniciGüncelle = async (req, res) => {
  try {
    const guncellenenKullanici = await userService.userGuncelle(req.params.id, req.body);
    res.status(200).json({ mesaj: 'kullanıcı güncellendi', guncellenenKullanici });
  } catch (error) {
    if (error.message && error.message.includes('bulunamadı')) {
      return res.status(404).json({ hata: error.message });
    }
    res.status(500).json({ mesaj: 'kullanıcı güncellenemedi' });
  }
};

exports.kullaniciFiltrele = async (req, res) => {
  try {
    const filtrelenmisKullanicilar = await userService.userBul(req.query);
    res.status(200).json({ mesaj: 'kullanıcılar filtrelendi', filtrelenmisKullanicilar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mesaj: 'kullanılar filtelenemedi' });
  }
};

exports.kullaniciGetir = async (req, res) => {
  try {
    const kullanici = await userService.userGetir(req.params.id);
    res.status(200).json({ mesaj: 'Kullanıcı bulundu.', kullanici });
  } catch (error) {
    if (error.message && error.message.includes('bulunamadı')) {
      return res.status(404).json({ hata: error.message });
    }
    res.status(400).json({ hata: error.message });
  }
};