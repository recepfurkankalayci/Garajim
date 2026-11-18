const userRepository = require('../repositories/UserRepostory'); 

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
 const isAdmin = reqUser.role === 'ADMIN';
const isSelf = reqUser.userId === id; 
if (!isAdmin && !isSelf) {
  throw new CostumError('Bu kullanıcı bilgilerine erişim yetkiniz yok.', 403);
}
const user = await userRepository.findById(id);
if (!user) {
  throw new CostumError('Kullanıcı bulunamadı.', 404);
} 
return user;
};

exports.userGuncelle = async (id, reqUser, data) => {
  await exports.userGetir(id, reqUser);
  const updatedUser = await userRepository.update(id, data);
  logger.info(`Kullanıcı güncellendi. Güncellenen ID: ${id}, İşlemi Yapan: ${reqUser.userId}`);
  
  return updatedUser;
};

exports.userSil = async (id, reqUser) => {
  await exports.userGetir(id, reqUser);
  const deletedUser = await userRepository.delete(id);
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