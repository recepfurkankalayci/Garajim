const careRepository = require('../repositories/CareRepository');

exports.bakimEkle = async (data) => {
  return await careRepository.create(data);
};

exports.bakimListele = async () => {
  return await careRepository.findAll();
};

exports.bakimGetir = async (id) => {
  const bakimID = Number.parseInt(id, 10);

  if (!Number.isInteger(bakimID)) {
    throw new Error('Geçersiz bakım ID.');
  }

  const bakim = await careRepository.findById(bakimID);

  if (!bakim) {
    throw new Error('Bakım bulunamadı.');
  }

  return bakim;
};

exports.bakimGuncelle = async (id, data) => {
  const bakimID = Number.parseInt(id, 10);

  if (!Number.isInteger(bakimID)) {
    throw new Error('Geçersiz bakım ID.');
  }

  return await careRepository.update(bakimID, data);
};

exports.bakimSil = async (id) => {
  const bakimID = Number.parseInt(id, 10);

  if (!Number.isInteger(bakimID)) {
    throw new Error('Geçersiz bakım ID.');
  }

  return await careRepository.delete(bakimID);
};

exports.bakimBul = async (query = {}) => {
  const filters = {
    header: query.header,
    hkm: query.hkm,
    cost: query.cost,
    transaction_date: query.transaction_date ? parseInt(query.transaction_date, 10) : undefined,
  };

  return await careRepository.findByFilters(filters);
};