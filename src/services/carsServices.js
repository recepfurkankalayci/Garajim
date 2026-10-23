const carRepository = require('../repositories/CarsRepository');

exports.aracEkle = async (data) => {
  return await carRepository.create(data);
};

exports.aracListele = async () => {
  return await carRepository.findAll(userId);
};

exports.aracGetir = async (id,userId) => {
  const aracID = Number.parseInt(id, 10);

  if (!Number.isInteger(aracID)) {
    throw new Error('Geçersiz araç ID.');
  }

  const arac = await carRepository.findById(aracID);

  if (!arac || arac.userID !== userId) {
    throw new Error('Araç bulunamadı veya bu araca erişim yetkiniz yok.');
  }

  return arac;
};

exports.aracGuncelle = async (id,userId, data) => {
  await exports.aracGetir(id, userId);
  const aracID = Number.parseInt(id, 10);

  if (!Number.isInteger(aracID)) {
    throw new Error('Geçersiz araç ID.');
  }

  return await carRepository.update(aracID, data);
};

exports.aracSil = async (id,userId) => {
  await exports.aracGetir(id, userId);
  const aracID = Number.parseInt(id, 10);

  if (!Number.isInteger(aracID)) {
    throw new Error('Geçersiz araç ID.');
  }

  return await carRepository.delete(aracID);
};

exports.aracBul = async (userId,query = {}) => {
  const filters = {
    userID: userId,
    brand: query.brand,
    model: query.model,
    license_plate: query.license_plate,
    year: query.year ? parseInt(query.year, 10) : undefined,
  };

  return await carRepository.findByFilters(filters);
};