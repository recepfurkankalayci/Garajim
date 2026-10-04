const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('./userRepository'); 

const JWT_SECRET = process.env.JWT_SECRET || "cok-gizli-super-anahtar-123";

exports.register = async (data) => {
    const mevcutKullanici = await userRepository.findByEmail(data.email);
    if (mevcutKullanici) {
        throw new Error("Bu e-posta adresi zaten kullanılıyor.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const yeniKullaniciData = {
        ...data,
        password: hashedPassword
    };

    const yeniKullanici = await userRepository.create(yeniKullaniciData);
    delete yeniKullanici.password;
    
    return yeniKullanici;
};

exports.login = async (email, password) => {
    const kullanici = await userRepository.findByEmail(email);
    if (!kullanici) {
        throw new Error("E-posta veya şifre hatalı.");
    }

    const sifreDogruMu = await bcrypt.compare(password, kullanici.password);
    if (!sifreDogruMu) {
        throw new Error("E-posta veya şifre hatalı.");
    }

    const token = jwt.sign(
        { userId: kullanici.id }, 
        JWT_SECRET, 
        { expiresIn: '1d' }
    );

    delete kullanici.password;
    return { kullanici, token };
};