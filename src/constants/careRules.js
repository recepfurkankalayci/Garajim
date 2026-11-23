const TUM_ARACLAR = ['BENZIN', 'DIZEL', 'BENZIN_LPG', 'HIBRIT', 'ELEKTRIK'];
const ICTEN_YANMALI = ['BENZIN', 'DIZEL', 'BENZIN_LPG', 'HIBRIT'];
const BENZINLI_GRUP = ['BENZIN', 'BENZIN_LPG', 'HIBRIT'];

const BAKIM_KURALLARI = {

  MOTOR_YAGI: {
    ad: 'Motor Yağı ve Yağ Filtresi',
    kmPeriyodu: 10000,
    ayPeriyodu: 12,
    yakitTipleri: ICTEN_YANMALI,
  },
  HAVA_FILTRESI: {
    ad: 'Hava Filtresi',
    kmPeriyodu: 15000,
    ayPeriyodu: 12,
    yakitTipleri: ICTEN_YANMALI,
  },
  POLEN_FILTRESI: {
    ad: 'Polen (Kabin) Filtresi',
    kmPeriyodu: 15000,
    ayPeriyodu: 12,
    yakitTipleri: TUM_ARACLAR,
  },
  YAKIT_FILTRESI_DIZEL: {
    ad: 'Yakıt Filtresi (Dizel)',
    kmPeriyodu: 20000,
    ayPeriyodu: 24,
    yakitTipleri: ['DIZEL'],
  },
  YAKIT_FILTRESI_BENZIN: {
    ad: 'Yakıt Filtresi (Benzinli)',
    kmPeriyodu: 40000,
    ayPeriyodu: 36,
    yakitTipleri: BENZINLI_GRUP,
  },
  LPG_FILTRESI: {
    ad: 'LPG Gaz ve Sıvı Faz Filtreleri',
    kmPeriyodu: 10000,
    ayPeriyodu: null,
    yakitTipleri: ['BENZIN_LPG'],
  },
  ATESLEME_BUJISI: {
    ad: 'Ateşleme Bujileri',
    kmPeriyodu: 30000,
    ayPeriyodu: 24,
    yakitTipleri: BENZINLI_GRUP,
  },
  HIBRIT_BATARYA_FILTRESI: {
    ad: 'Hibrit Batarya Soğutma Filtresi Kontrolü',
    kmPeriyodu: null,
    ayPeriyodu: 12,
    yakitTipleri: ['HIBRIT'],
  },

  FREN_HIDROLIGI: {
    ad: 'Fren Hidroliği',
    kmPeriyodu: 30000,
    ayPeriyodu: 24,
    yakitTipleri: TUM_ARACLAR,
  },
  SANZIMAN_YAGI: {
    ad: 'Şanzıman Yağı',
    kmPeriyodu: 60000,
    ayPeriyodu: 48,
    yakitTipleri: ICTEN_YANMALI,
  },
  ANTIFRIZ: {
    ad: 'Antifriz / Soğutma Sıvısı',
    kmPeriyodu: 60000,
    ayPeriyodu: 24,
    yakitTipleri: TUM_ARACLAR,
  },
  DIREKSIYON_YAGI: {
    ad: 'Hidrolik Direksiyon Yağı',
    kmPeriyodu: 60000,
    ayPeriyodu: 48,
    yakitTipleri: ICTEN_YANMALI,
  },
  ADBLUE_DOLUMU: {
    ad: 'AdBlue Dolumu',
    kmPeriyodu: 10000,
    ayPeriyodu: null,
    yakitTipleri: ['DIZEL'],
  },

  TRIGER_SETI: {
    ad: 'Triger Seti (Kayış/Zincir ve Devirdaim)',
    kmPeriyodu: 60000,
    ayPeriyodu: 48,
    yakitTipleri: ICTEN_YANMALI,
  },
  V_KAYISI: {
    ad: 'V Kayışı (Aksesuar Kayışı)',
    kmPeriyodu: 60000,
    ayPeriyodu: 48,
    yakitTipleri: ICTEN_YANMALI,
  },
  DEBRIYAJ_SETI: {
    ad: 'Debriyaj Seti (Baskı Balata)',
    kmPeriyodu: 80000,
    ayPeriyodu: null,
    yakitTipleri: ['BENZIN', 'DIZEL', 'BENZIN_LPG'],
  },

  DPF_KONTROLU: {
    ad: 'DPF (Partikül Filtresi) Kontrolü',
    kmPeriyodu: 80000,
    ayPeriyodu: null,
    yakitTipleri: ['DIZEL'],
  },
  ENJEKTOR_TURBO_EGR: {
    ad: 'Enjektör, Turbo ve EGR Kontrolü',
    kmPeriyodu: 90000,
    ayPeriyodu: null,
    yakitTipleri: ICTEN_YANMALI,
  },
  LPG_TANKI_DEGISIMI: {
    ad: 'LPG Tankı Değişimi',
    kmPeriyodu: null,
    ayPeriyodu: 120,
    yakitTipleri: ['BENZIN_LPG'],
  },

  FREN_BALATA: {
    ad: 'Fren Balataları (Ön / Arka)',
    kmPeriyodu: 30000,
    ayPeriyodu: null,
    yakitTipleri: TUM_ARACLAR,
  },
  FREN_DISKI: {
    ad: 'Fren Diskleri',
    kmPeriyodu: 60000,
    ayPeriyodu: null,
    yakitTipleri: TUM_ARACLAR,
  },
  LASTIK_ROTASYON: {
    ad: 'Lastik Rotasyonu',
    kmPeriyodu: 10000,
    ayPeriyodu: 12,
    yakitTipleri: TUM_ARACLAR,
  },
  LASTIK_DEGISIMI: {
    ad: 'Lastik Değişimi',
    kmPeriyodu: 40000,
    ayPeriyodu: 60,
    yakitTipleri: TUM_ARACLAR,
  },
  ROT_BALANS: {
    ad: 'Rot ve Balans Ayarı',
    kmPeriyodu: 15000,
    ayPeriyodu: 12,
    yakitTipleri: TUM_ARACLAR,
  },
  SUSPANSIYON_ON_TAKIM: {
    ad: 'Süspansiyon ve Ön Takım Kontrolü',
    kmPeriyodu: 60000,
    ayPeriyodu: null,
    yakitTipleri: TUM_ARACLAR,
  },
  AKU: {
    ad: 'Akü Kontrolü / Değişimi',
    kmPeriyodu: null,
    ayPeriyodu: 36,
    yakitTipleri: TUM_ARACLAR,
  },
  KLIMA_KONTROLU: {
    ad: 'Klima Gazı ve Sistem Kontrolü',
    kmPeriyodu: null,
    ayPeriyodu: 12,
    yakitTipleri: TUM_ARACLAR,
  },
  SILECEK: {
    ad: 'Silecek Lastikleri',
    kmPeriyodu: null,
    ayPeriyodu: 12,
    yakitTipleri: TUM_ARACLAR,
  },
};

module.exports = BAKIM_KURALLARI;