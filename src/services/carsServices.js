const carRepository = require('../repositories/CarsRepository');
const logger = require('../utils/logger');
const CostumError = require('../utils/CostumError');
exports.aracEkle = async (data) => {
  const yeniArac = await carRepository.create(data);
  logger.info(`Yeni araç eklendi. Araç ID: ${yeniArac.id}, Kullanıcı: ${data.userID}`);
  return yeniArac;
};

exports.aracListele = async (userId) => {
  const aracListesi = await carRepository.findAll(userId);
  return aracListesi;
};

exports.aracGetir = async (id,userId) => {
  const aracId = Number.parseInt(id, 10);
  const arac = await carRepository.findById(aracId);
  if (!arac || arac.userID !== userId) {
    throw new CostumError('Araç bulunamadı veya bu araca erişim yetkiniz yok.', 404);
  }
  logger.info(`Araç id ile getirildi. Araç ID: ${aracId}, Kullanıcı: ${userId}`);
  return arac;
};

exports.aracGuncelle = async (id,userId, data) => {
  await exports.aracGetir(id, userId);
  const aracId = Number.parseInt(id, 10);
  logger.info(`Araç güncellendi. Araç ID: ${aracId}, Kullanıcı: ${userId}`);
  return await carRepository.update(aracId, data);
};

exports.aracSil = async (id,userId) => {
  await exports.aracGetir(id, userId);
  const aracId = Number.parseInt(id, 10);
  logger.info(`Araç silindi. Araç ID: ${aracId}, Kullanıcı: ${userId}`);
  return await carRepository.delete(aracId);
};

exports.aracBul = async (userId,query = {}) => {
  const filters = {
    userID: userId,
    brand: query.brand,
    model: query.model,
    license_plate: query.license_plate,
    year: query.year,
  };
  logger.info(`Araçlar filtreler aracılığıyla getirildi. Kullanıcı: ${userId}`);
  return await carRepository.findByFilters(filters);
};