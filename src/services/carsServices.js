const carRepository = require('../repositories/CarsRepository');
const logger = require('../utils/logger');
const CostumError = require('../utils/CostumError');
exports.aracEkle = async (data) => {
  const yeniArac = await carRepository.create(data);
  logger.info(`Yeni araç eklendi. Araç ID: ${yeniArac.id}, Kullanıcı: ${userID}`);
  return yeniArac;
};

exports.aracListele = async (userId) => {
  const aracListesi = await carRepository.findAll(userId);
  return aracListesi;
};

exports.aracGetir = async (id,userId) => {
  const arac = await carRepository.findById(id);
  if (!arac || arac.userID !== userId) {
    throw new Error('Araç bulunamadı veya bu araca erişim yetkiniz yok.');
  }
    logger.info(`Araç id ile getirildi. Araç ID: ${yeniArac.id}, Kullanıcı: ${userID}`);
  return arac;
};

exports.aracGuncelle = async (id,userId, data) => {
  await exports.aracGetir(id, userId);
  logger.info(`Araç güncellendi. Araç ID: ${yeniArac.id}, Kullanıcı: ${userID}`);
  return await carRepository.update(aracID, data);
};

exports.aracSil = async (id,userId) => {
  await exports.aracGetir(id, userId);
  logger.info(`Araç silindi. Araç ID: ${yeniArac.id}, Kullanıcı: ${userID}`);
  return await carRepository.delete(aracID);
};

exports.aracBul = async (userId,query = {}) => {
  const filters = {
    userID: userId,
    brand: query.brand,
    model: query.model,
    license_plate: query.license_plate,
    year: query.year,
  };
  logger.info(`Filtreler aracılığıyla arac getirildi. Araç ID: ${yeniArac.id}, Kullanıcı: ${userID}`);
  return await carRepository.findByFilters(filters);
};