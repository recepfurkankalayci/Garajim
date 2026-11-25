const BAKIM_KURALLARI = require('../constants/careRules');

const GUN_MS = 1000 * 60 * 60 * 24;
const YAKLASMA_KM = 1000;
const YAKLASMA_GUN = 30;
const DURUM_ONCELIGI = {
  GECIKTI: 1,
  YAKLASTI: 2,
  GUNCEL: 3,
  KAYIT_YOK: 4,
};

const kalanGunHesapla = (sonBakimTarihi, ayPeriyodu) => {
  const bugun = new Date();
  bugun.setHours(0, 0, 0, 0);

  const sonrakiTarih = new Date(sonBakimTarihi);
  sonrakiTarih.setHours(0, 0, 0, 0);
  sonrakiTarih.setMonth(sonrakiTarih.getMonth() + ayPeriyodu);

  const kalanGun = Math.round((sonrakiTarih - bugun) / GUN_MS);
  return { kalanGun, sonrakiTarih };
};

const bakimDurumuHesapla = (arac, gecmisBakimlar) => {
  const rapor = [];
  const guncelKm = arac.gkm ?? 0;

  for (const [kod, kural] of Object.entries(BAKIM_KURALLARI)) {
    
    if (!kural.yakitTipleri.includes(arac.fuelType)) {
      continue;
    }

    const sonBakim = gecmisBakimlar.find((b) => b.bakimTuru === kod);

    if (!sonBakim) {
      rapor.push({
        kod,
        ad: kural.ad,
        durum: 'KAYIT_YOK',
        kmPeriyodu: kural.kmPeriyodu,
        ayPeriyodu: kural.ayPeriyodu,
        sonBakimTarihi: null,
        sonBakimKm: null,
        sonrakiKm: null,
        kalanKm: null,
        sonrakiTarih: null,
        kalanGun: null,
      });
      continue;
    }

    let sonrakiKm = null;
    let kalanKm = null;
    if (kural.kmPeriyodu !== null) {
      sonrakiKm = sonBakim.hkm + kural.kmPeriyodu;
      kalanKm = sonrakiKm - guncelKm;
    }

    let sonrakiTarih = null;
    let kalanGun = null;
    if (kural.ayPeriyodu !== null) {
      const tarihHesabi = kalanGunHesapla(sonBakim.transaction_date, kural.ayPeriyodu);
      sonrakiTarih = tarihHesabi.sonrakiTarih;
      kalanGun = tarihHesabi.kalanGun;
    }

    
    let durum = 'GUNCEL';
    if ((kalanKm !== null && kalanKm <= 0) || (kalanGun !== null && kalanGun <= 0)) {
      durum = 'GECIKTI';
    } else if ((kalanKm !== null && kalanKm <= YAKLASMA_KM) ||(kalanGun !== null && kalanGun <= YAKLASMA_GUN)) 
    {
      durum = 'YAKLASTI';
    }

    rapor.push({
      kod,
      ad: kural.ad,
      durum,
      kmPeriyodu: kural.kmPeriyodu,
      ayPeriyodu: kural.ayPeriyodu,
      sonBakimTarihi: sonBakim.transaction_date,
      sonBakimKm: sonBakim.hkm,
      sonrakiKm,
      kalanKm,
      sonrakiTarih,
      kalanGun,
    });
  }

  rapor.sort((a, b) => DURUM_ONCELIGI[a.durum] - DURUM_ONCELIGI[b.durum]);
  return rapor;
};

module.exports = { bakimDurumuHesapla };