const careRepository = require('../repositories/CareRepository');
const carsService = require('./carsServices');
const logger = require('../utils/logger');
const CostumError = require('../utils/CostumError');

exports.bakimEkle = async (data, userId) => {
  await carsService.aracGetir(data.carID, userId);
  const bakimVerisi = { ...data };
  const yeniBakim = await careRepository.create(bakimVerisi)
  logger.info(`Yeni bakım kaydı eklendi. BakımID: ${yeniBakim.id}, İşlemi Yapan Kullanıcı: ${userId}`);
  return yeniBakim;
};

exports.bakimListele = async (userId) => {
  const bakimListesi = await careRepository.findAll(userId);
  logger.info(`Bakım kayıtları listelendi. İşlemi Yapan Kullanıcı: ${userId}`);
  return bakimListesi;
};

exports.bakimGetir = async (id,userId,role) => {
  const bakimID = Number.parseInt(id, 10);
  const bakim = await careRepository.findById(bakimID);
  if (!bakim || bakim.car?.userID !== userId) {
    if (role !== 'ADMIN') {
      throw new CostumError('Bakım bulunamadı veya bu kayda erişim yetkiniz yok.', 404);
    }
  }
  logger.info(`Bakım kaydı id ile bulundu. BakımID: ${bakimID}, İşlemi Yapan Kullanıcı: ${userId}`);
  return bakim;
};

exports.bakimGuncelle = async (id, userId, data) => {
  await exports.bakimGetir(id, userId, 'USER');
  const bakimID = Number.parseInt(id, 10);
  const guncelBakim = await careRepository.update(bakimID, data);
  logger.info(`Bakım kaydı güncellendi. BakımID: ${id}, İşlemi Yapan Kullanıcı: ${userId}`);
  return guncelBakim;
};


exports.bakimSil = async (id, userId) => {
  await exports.bakimGetir(id, userId);
  const bakimID = Number.parseInt(id, 10);
  const silinenBakim = await careRepository.delete(bakimID);
  logger.info(`Bakım kaydı silindi. BakımID: ${id}, İşlemi Yapan Kullanıcı: ${userId}`);
  return silinenBakim;
};

exports.bakimBul = async (query = {}, userId) => {
  const filters = {
    car: { userID: userId },
    header: query.header,
    hkm: query.hkm,
    cost: query.cost,
    transaction_date: query.transaction_date
  };
  const bakimFiltresi = await careRepository.findByFilters(filters);
  logger.info(`Bakım kaydı filtreler aracılığıyla bulundu. BakımID: ${id}, İşlemi Yapan Kullanıcı: ${userId}`);
  return bakimFiltresi;
};