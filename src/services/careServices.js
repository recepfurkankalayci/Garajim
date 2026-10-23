const careRepository = require('../repositories/CareRepository');
const carsService = require('./carsServices');

exports.bakimEkle = async (data) => {
  await carsService.aracGetir(data.carID, data.userId);
  const { userId, ...bakimVerisi } = data;
  return await careRepository.create(bakimVerisi)
};

exports.bakimListele = async (userId) => {
  return await careRepository.findAll(userId);
};

exports.bakimGetir = async (id, userId) => {
  const bakimID = Number.parseInt(id, 10);

  if (!Number.isInteger(bakimID)) {
    throw new Error('Geçersiz bakım ID.');
  }

  const bakim = await careRepository.findById(bakimID);

  if (!bakim || bakim.car.userID !== userId) {
    throw new Error('Bakım bulunamadı veya erişim yetkiniz yok.');
  }

  return bakim;
};

exports.bakimGuncelle = async (id, userId, data) => {

  
  await exports.bakimGetir(id, userId);

  const bakimID = Number.parseInt(id, 10);

  return await careRepository.update(bakimID, data);
};


exports.bakimSil = async (id, userId) => {
 
  await exports.bakimGetir(id, userId);

  const bakimID = Number.parseInt(id, 10);

  return await careRepository.delete(bakimID);
};

exports.bakimBul = async (query = {}) => {
  const filters = {
    car: { userID: userId },
    header: query.header,
    hkm: query.hkm,
    cost: query.cost,
    transaction_date: query.transaction_date ? parseInt(query.transaction_date, 10) : undefined,
  };

  return await careRepository.findByFilters(filters);
};