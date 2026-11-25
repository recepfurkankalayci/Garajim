const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepostory');
const CostumError = require('../utils/CostumError');

const JWT_SECRET = process.env.JWT_SECRET || 'cok-gizli-super-anahtar-123';

exports.register = async (data) => {
  const normalizedEmail = data.email.trim().toLowerCase();
  const mevcutKullanici = await userRepository.findByEmail(normalizedEmail);
  if (mevcutKullanici) {
    throw new CostumError('Bu e-posta adresi zaten kullanılıyor.',409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const yeniKullaniciData = {
    name: data.name,
    email: data.email,
    telephone: data.telephone,
    password: hashedPassword,
    role: 'USER'
  };

  const yeniKullanici = await userRepository.create(yeniKullaniciData);
  const {password, ...guvenliKullanici} = yeniKullanici;
  return guvenliKullanici;
};

exports.login = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const kullanici = await userRepository.findByEmail(normalizedEmail);
  if (!kullanici) {
    throw new CostumError('E-posta veya şifre hatalı.', 401);
  }

  const sifreDogruMu = await bcrypt.compare(password, kullanici.password);
  if (!sifreDogruMu) {
    throw new CostumError('E-posta veya şifre hatalı.',401);
  }

  const token = jwt.sign(
    { userId: kullanici.id ,
      role : kullanici.role
    },
     JWT_SECRET, { expiresIn: '1d' });

  const { password: _, ...guvenliKullanici } = kullanici;
  return { kullanici: guvenliKullanici, token };
};