const userRepository = require('../repositories/UserRepostory'); 

exports.userEkle = async (data) => {
  return await userRepository.create(data);
};


exports.userListele = async () => {
  return await userRepository.findAll();
};


exports.userGetir = async (id, tokenUserId) => {
  const userID = Number.parseInt(id, 10);

  if (!Number.isInteger(userID)) {
    throw new Error('Geçersiz user ID.');
  }


  if (userID !== tokenUserId) {
    throw new Error('Bu kullanıcı bilgilerine erişim yetkiniz yok.');
  }

  const user = await userRepository.findById(userID);

  if (!user) {
    throw new Error('Kullanıcı bulunamadı.');
  }

  return user;
};


exports.userGuncelle = async (id, tokenUserId, data) => {
  await exports.userGetir(id, tokenUserId);

  const userID = Number.parseInt(id, 10);
  return await userRepository.update(userID, data);
};


exports.userSil = async (id, tokenUserId) => {
  await exports.userGetir(id, tokenUserId);

  const userID = Number.parseInt(id, 10);
  return await userRepository.delete(userID);
};

exports.userBul = async (query = {}) => {
  const filters = {
    email: query.email,
    name: query.name,
  };

  return await userRepository.findByFilters(filters);
};