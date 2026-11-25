const careRepository = require('../repositories/CareRepository');
const carsService = require('./carsServices');
const logger = require('../utils/logger');
const BAKIM_KURALLARI = require('../constants/careRules');
const CostumError = require('../utils/CostumError');

exports.bakimEkle = async (data, userId) => {
 const arac = await carsService.aracGetir(data.carID, userId);

  if (data.transaction_date) {
    const bugununSonu = new Date();
    bugununSonu.setHours(23, 59, 59, 999);
    if (new Date(data.transaction_date) > bugununSonu) {
      throw new CostumError('Bakım tarihi bugünden ileri bir tarih olamaz.', 400);
    }
  }
  const kural = BAKIM_KURALLARI[data.bakimTuru];
  if (kural?.yakitTipleri && !kural.yakitTipleri.includes(arac.fuelType)) {
    throw new CostumError(
      `${arac.fuelType} yakıt tipindeki araca bu bakım türü eklenemez.`,
      400
    );
  }
  let yeniBakim;
  if (data.hkm > arac.gkm) {
    yeniBakim = await careRepository.createWithCarKmUpdate(data, arac.id, data.hkm);
  } else {
    yeniBakim = await careRepository.create(data);
  }

  logger.info(
    `Yeni bakım kaydı eklendi. BakımID: ${yeniBakim.id}, AraçID: ${arac.id}, Kullanıcı: ${userId}`
  );
  return yeniBakim;
};

exports.bakimListele = async (userId) => {
  const bakimListesi = await careRepository.findAll(userId);
  return bakimListesi;
};

exports.bakimGetir = async (id,userId) => {
  const bakimID = Number.parseInt(id, 10);
  const bakim = await careRepository.findById(bakimID);
  if (!bakim || bakim.car?.userID !== userId) {
      throw new CostumError('Bakım bulunamadı veya bu kayda erişim yetkiniz yok.', 404);
  }
  return bakim;
};

exports.bakimGuncelle = async (id, data, userId) => {
  const mevcutBakim = await exports.bakimGetir(id, userId);
  const { carID, id: bodyId, ...guncellenecekVeri } = data;
 if (guncellenecekVeri.transaction_date) {
    const bugununSonu = new Date();
    bugununSonu.setHours(23, 59, 59, 999);
    if (new Date(guncellenecekVeri.transaction_date) > bugununSonu) {
      throw new CostumError('Bakım tarihi bugünden ileri bir tarih olamaz.', 400);
    }
  }
  if (guncellenecekVeri.bakimTuru) {
    const kural = BAKIM_KURALLARI[guncellenecekVeri.bakimTuru];
    if (kural?.yakitTipleri && !kural.yakitTipleri.includes(mevcutBakim.car.fuelType)) {
      throw new CostumError(
        `${mevcutBakim.car.fuelType} yakıt tipindeki araca bu bakım türü atanamaz.`,
        400
      );
    }
  }
  let guncellenenBakim;
  if (guncellenecekVeri.hkm !== undefined && guncellenecekVeri.hkm > mevcutBakim.car.gkm) {
    guncellenenBakim = await careRepository.updateWithCarKmUpdate(
      mevcutBakim.id,
      guncellenecekVeri,
      mevcutBakim.car.id,
      guncellenecekVeri.hkm
    );
  } else {
    guncellenenBakim = await careRepository.update(mevcutBakim.id, guncellenecekVeri);
  }

  logger.info(
    `Bakım kaydı güncellendi. BakımID: ${guncellenenBakim.id}, AraçID: ${mevcutBakim.car.id}, Kullanıcı: ${userId}`
  );
  return guncellenenBakim;
};


exports.bakimSil = async (id, userId) => {
  const mevcutBakim = await exports.bakimGetir(id, userId);
  const silinenBakim = await careRepository.delete(mevcutBakim.id);
  logger.info(
    `Bakım kaydı silindi. BakımID: ${silinenBakim.id}, AraçID: ${mevcutBakim.car.id}, Kullanıcı: ${userId}`
  );
  return silinenBakim;
};

exports.bakimBul = async (query = {}, userId) => {
const filters = {
    car: { userID: userId },
  };

  if (query.carID) filters.carID = Number.parseInt(query.carID, 10);
  if (query.bakimTuru) filters.bakimTuru = query.bakimTuru;
  if (query.header) filters.header = query.header;
  if (query.hkm) filters.hkm = Number(query.hkm);
  if (query.cost) filters.cost = Number(query.cost);
  if (query.transaction_date) filters.transaction_date = new Date(query.transaction_date);

  return await careRepository.findByFilters(filters);
};