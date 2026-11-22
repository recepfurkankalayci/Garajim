const userRepository = require('../repositories/UserRepostory'); 
const logger = require('../utils/logger');
const CostumError = require('../utils/CostumError');

exports.userEkle = async (data,reqUser) => {
  if (reqUser.role !== 'ADMIN') {
    throw new CostumError('Kullanıcı ekleme işlemi sadece yetkililer tarafından yapılabilir.', 403);
  }
  const newUser = await userRepository.create(data);
  logger.info(`Yeni kullanıcı eklendi. Ekleyen Admin ID: ${reqUser.userId}, Eklenen Kullanıcı ID: ${newUser.id}`);
  
  return newUser;
};

exports.userListele = async (reqUser) => {
  if (reqUser.role !== 'ADMIN') {
    throw new CostumError('Kullanıcı listesini görme yetkiniz yok.', 403);
  }
  
  return await userRepository.findAll();
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
  const numericId = Number.parseInt(id, 10);
  const updatedUser = await userRepository.update(numericId, data);
  logger.info(`Kullanıcı güncellendi. Güncellenen ID: ${id}, İşlemi Yapan: ${reqUser.userId}`);
  
  return updatedUser;
};

exports.userSil = async (id, reqUser) => {
  await exports.userGetir(id, reqUser);
  const numericId = Number.parseInt(id, 10);
  const deletedUser = await userRepository.delete(numericId);
  logger.info(`Kullanıcı silindi. Silinen ID: ${id}, İşlemi Yapan: ${reqUser.userId}`);
  return deletedUser;
};

exports.userBul = async (query = {}, reqUser) => {
  if (reqUser.role !== 'ADMIN') {
    throw new CostumError('Kullanıcı arama yetkiniz yok.', 403);
  }
  const filters = {
    email: query.email,
    name: query.name,
  };
  return await userRepository.findByFilters(filters);
};