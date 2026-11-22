const userRepository = require('../repositories/UserRepostory'); 
const logger = require('../utils/logger');
const CostumError = require('../utils/CostumError');
const bcrypt = require('bcrypt');

exports.userEkle = async (data,reqUser) => {
  if (reqUser.role !== 'ADMIN') {
    throw new CostumError('Kullanıcı ekleme işlemi sadece yetkililer tarafından yapılabilir.', 403);
  }
  const normalizedEmail = data.email.trim().toLowerCase();

  const mevcutKullanici = await userRepository.findByEmail(normalizedEmail);
  if (mevcutKullanici) {
    throw new CostumError('Bu e-posta adresi zaten kullanılıyor.', 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const newUser = await userRepository.create({
    name: data.name.trim(),
    email: normalizedEmail,
    telephone: data.telephone.trim(),
    password: hashedPassword,
    role: data.role || 'USER', 
  });

  logger.info(`Yeni kullanıcı eklendi. Ekleyen Admin ID: ${reqUser.userId}, Eklenen Kullanıcı ID: ${newUser.id}`);

  const { password, ...guvenliKullanici } = newUser;
  return guvenliKullanici;
};

exports.userListele = async (reqUser) => {
  if (reqUser.role !== 'ADMIN') {
    throw new CostumError('Kullanıcı listesini görme yetkiniz yok.', 403);
  }
  const users = await userRepository.findAll();
  return users.map(({ password, ...guvenliUser }) => guvenliUser);
};

exports.userGetir = async (id, reqUser) => {
  const numericId = Number.parseInt(id, 10);
  const isAdmin = reqUser.role === 'ADMIN';
  const isSelf = reqUser.userId === numericId; 
  if (!isAdmin && !isSelf) {
    throw new CostumError('Bu kullanıcı bilgilerine erişim yetkiniz yok.', 403);
  }
  const user = await userRepository.findById(numericId);
  if (!user) {
    throw new CostumError('Kullanıcı bulunamadı.', 404);
  } 
  return user;
};

exports.userGuncelle = async (id, reqUser, data) => {
  await exports.userGetir(id, reqUser);
  const guncellenecekVeri = {
    name: data.name,
    email: data.email,
    telephone: data.telephone,
  };
  if (reqUser.role === 'ADMIN' && data.role) {
    guncellenecekVeri.role = data.role;
  }
  const updatedUser = await userRepository.update(id, guncellenecekVeri);
  logger.info(`Kullanıcı güncellendi. Güncellenen ID: ${id}, İşlemi Yapan: ${reqUser.userId}`);
  return updatedUser;
};

exports.userSil = async (id, reqUser) => {
  const numericId = Number.parseInt(id, 10);
  await exports.userGetir(numericId, reqUser);
  const deletedUser = await userRepository.delete(numericId);
  logger.info(`Kullanıcı silindi. Silinen ID: ${id}, İşlemi Yapan: ${reqUser.userId}`);
  const { password, ...guvenliUser } = deletedUser;
  return guvenliUser;
};

exports.userBul = async (query = {}, reqUser) => {
  if (reqUser.role !== 'ADMIN') {
    throw new CostumError('Kullanıcı arama yetkiniz yok.', 403);
  }
  const filters = {
    email: query.email?.trim().toLowerCase() || undefined,
    name: query.name?.trim() || undefined,
  };
  const users = await userRepository.findByFilters(filters);
  return users.map(({ password, ...guvenliUser }) => guvenliUser);
};


exports.sifreDegistir = async (id,reqUser,eskiSifre,yeniSifre) => {
    const user = await exports.userGetir(id,reqUser);
    if(reqUser.userId === id){
      const sifreDogruMu = await bcrypt.compare(eskiSifre,user.password);

      if(!sifreDogruMu){
        throw new CostumError('Mevcut şifreniz hatalı.', 400);
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(yeniSifre,salt);
    await userRepository.update(id, { password: hashedPassword });
    logger.info(`Kullanıcı şifresi değiştirildi. ID: ${id}, İşlemi Yapan: ${reqUser.userId}`);

    return { message: 'Şifre başarıyla güncellendi.' };
}