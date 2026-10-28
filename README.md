# Garajım

Garajım, araç sahiplerinin araç bilgilerini, bakım kayıtlarını ve kullanıcı hesaplarını tek bir sistemde yönetmesine yardımcı olmak amacıyla geliştirilmiş bir Node.js/Express API projesidir. Proje, aracın bakım takvimi, bakım maliyeti, araç bilgileri ve kullanıcı erişimi gibi temel alanları yönetmeye odaklanır.

> 🚧 Not: Bu proje şu an aktif geliştirme aşamasındadır. Özellikle API davranışları, hata yönetimi ve doğrulama katmanı ilerleyen aşamalarda daha da olgunlaştırılacaktır.

## 1. Proje Hakkında

Garajım uygulaması, kullanıcıların araçlarını ve araçlarına ait bakım geçmişini takip etmelerini sağlar. Temel kullanım senaryoları şunlardır:

- Kullanıcı kaydı ve giriş işlemi
- Araç ekleme, listeleme, güncelleme ve silme
- Bakım kaydı oluşturma, bulma, listeleme ve silme
- Kullanıcı bazlı veri erişim ve yetkilendirme
- PostgreSQL veritabanı üzerinde veri saklama
- Prisma ORM ile veri modellemesi ve veritabanı yönetimi

Bu yapı, küçük ve orta ölçekli araç takip uygulamaları için uygun bir arka uç altyapısı sunar.

## 2. Kullanılan Teknolojiler

- Node.js
- Express.js
- JavaScript (CommonJS)
- PostgreSQL
- Prisma ORM
- JWT (JSON Web Token)
- bcryptjs (şifre hashing)
- Zod (validation)
- Docker / Docker Compose
- Jest + Supertest (test altyapısı)

## 3. Proje Yapısı

```text
garajim/
├── README.md
├── docker-compose.yaml
├── dockerfile
├── package.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controller/
│   │   ├── authController.js
│   │   ├── careController.js
│   │   ├── carsController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandle.js
│   │   ├── rateLimiter.js
│   │   └── validate.js
│   ├── repositories/
│   │   ├── CareRepository.js
│   │   ├── CarsRepository.js
│   │   └── UserRepostory.js
│   ├── router/
│   │   ├── authRouter.js
│   │   ├── careRouter.js
│   │   ├── carsRouter.js
│   │   └── userRouter.js
│   ├── services/
│   │   ├── authServices.js
│   │   ├── careServices.js
│   │   ├── carsServices.js
│   │   └── userServices.js
│   ├── test/
│   │   └── auth.test.js
│   ├── utils/
│   │   ├── CostumError.js
│   │   ├── asyncHandler.js
│   │   └── logger.js
│   ├── validations/
│   │   └── authValidation.js
│   ├── database.js
│   └── server.js
├── .env
├── .env.example
└── prisma.config.ts
```

## 4. Veritabanı Modeli

Aşağıda proje veritabanı ilişkilerinin görsel özeti yer almaktadır:

![ER Diagram](./docs/erd.svg)

Prisma schema dosyasında proje temel olarak üç ana varlık modellemektedir:

### User
- `id` - benzersiz kullanıcı id
- `email` - kullanıcı e-posta adresi
- `name` - kullanıcı adı
- `password` - şifre hash değeri
- `Cars` - kullanıcının araçları

### Cars
- `id` - araç id
- `license_plate` - plaka
- `brand` - marka
- `model` - model
- `year` - üretim yılı
- `userID` - ait olduğu kullanıcı id
- `gkm` - genel kilometre
- `care` - araç bakım kayıtları

### Care
- `id` - bakım kaydı id
- `header` - bakım başlığı
- `hkm` - bakım yapılan kilometre
- `cost` - bakım maliyeti
- `transaction_date` - bakım tarihi
- `carID` - bağlı olduğu araç id

Bu yapı, bir kullanıcının birden fazla aracı olabileceği ve her aracın birden fazla bakım kaydı tutabileceği mantığına dayanır.

## 5. Uygulama Akışı

### Authentication (Kimlik Doğrulama)

- Kullanıcı `POST /auth/register` adresi ile kayıt olur.
- Kullanıcı `POST /auth/login` ile giriş yapar.
- Sunucu JWT üretir ve kullanıcıya döner.
- Korunan rotalar için `Authorization: Bearer <token>` header'ı kullanılır.

### Araç Yönetimi

Kullanıcı giriş yaptıktan sonra araç işlemleri yapılır:

- `GET /araclar/listele` - aracları listeler
- `GET /araclar/filtrele` - filtreleme ile araç arama
- `POST /araclar/ekle` - yeni araç ekler
- `GET /araclar/:id` - tek araç getirir
- `PUT /araclar/:id` - araç günceller
- `DELETE /araclar/:id` - araç siler

### Bakım Yönetimi

- `GET /bakimlar/listele`
- `GET /bakimlar/filtrele`
- `POST /bakimlar/olustur`
- `GET /bakimlar/:id`
- `PUT /bakimlar/:id`
- `DELETE /bakimlar/:id`

### Kullanıcı Yönetimi

- `GET /kullanicilar/listele`
- `GET /kullanicilar/filtrele`
- `POST /kullanicilar/olustur`
- `GET /kullanicilar/:id`
- `PUT /kullanicilar/:id`
- `DELETE /kullanicilar/:id`

## 6. Çalıştırma Adımları

### Gereksinimler

- Node.js 18+
- npm veya pnpm
- Docker Desktop (opsiyonel ama önerilir)
- PostgreSQL (Docker üzerinden otomatik hazırlanabilir)

### 1) Depoyu klonlayın

```bash
git clone https://github.com/recepfurkankalayci/Garajim.git
cd Garajim
```

### 2) Bağımlılıkları yükleyin

```bash
npm install
```

### 3) Ortam değişkenlerini oluşturun

```bash
Copy-Item .env.example .env
```

`.env` dosyasını kendi bilgisayarınıza göre düzenleyin. Örnek içerik aşağıdaki gibidir:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/garajim?schema=public
DB_PASSWORD=your_strong_password
NODE_ENV=development
```

> Not: Gerçek `.env` dosyasını GitHub'a commit etmeyin. `.env.example` dosyasını paylaşılabilir tutun.

### 4) Veritabanını oluşturun ve Prisma'yı güncelleyin

Yerel PostgreSQL çalışıyorsa Prisma schema'nın karşılığına göre migration veya db push işlemi yapılabilir:

```bash
npx prisma db push
```

İsterseniz Prisma client'ı yeniden üretmek için:

```bash
npx prisma generate
```

### 5) Uygulamayı çalıştırın

Geliştirme modunda:

```bash
npm run dev
```

Prod benzeri çalıştırma:

```bash
npm start
```

### 6) Docker ile çalıştırma

Projede `docker-compose.yaml` dosyası bulunmaktadır. Aşağıdaki komutla uygulama ve PostgreSQL sunucusu birlikte başlatılabilir:

```bash
docker compose up --build -d
```

Bu komut:

- uygulamayı çalıştırır
- PostgreSQL konteynerini oluşturur
- `.env` dosyasındaki `DB_PASSWORD` değerini kullanarak veritabanını hazır hale getirir
- uygulamayı `http://localhost:3000` üzerinde sunar

## 7. Örnek API İstekleri

### Kullanıcı kaydı

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ornek@garajim.com",
    "name": "Ahmet",
    "password": "Sifre123!"
  }'
```

### Giriş

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ornek@garajim.com",
    "password": "Sifre123!"
  }'
```

### Araç ekleme

```bash
curl -X POST http://localhost:3000/araclar/ekle \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "license_plate": "34ABC123",
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2022,
    "gkm": 12000
  }'
```

### Bakım kaydı oluşturma

```bash
curl -X POST http://localhost:3000/bakimlar/olustur \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "header": "Yağ değişimi",
    "hkm": 15000,
    "cost": 1800,
    "transaction_date": "2026-10-24T00:00:00.000Z",
    "carID": 1
  }'
```

## 8. Güvenlik ve Notlar

- Şifreler `bcryptjs` ile hashlenir.
- JWT tabanlı kimlik doğrulama kullanılır.
- Rate limiting middleware'i eklenmiştir.
- Helmet ve CORS middleware'leri aktif tutulur.
- Projede bazı alanlar iş mantığını sadeleştirme amacıyla Türkçe isimlendirilmiştir; bu nedenle model, route ve değişken adlarında tutarlılık sorunları görülebilir.
- Bu proje üretim ortamı için tamamen olgunlaştırılmış bir seviyede değildir; geliştirme ve test süreçleri devam etmektedir.

## 9. Gelecek Geliştirmeler

Aşağıdaki iyileştirmeler projeye katkı sağlayabilir:

- kullanıcı/araç/bakım için daha detaylı validation kuralları
- hata mesajları ve status code standartlaştırılması
- API dokümantasyonu (Swagger/OpenAPI)
- bakım hatırlatma sistemi ve periyodik uyarılar
- servis merkezi ve adres rehberi
- filtreleme ve raporlama geliştirmeleri
- test kapsamının artırılması
- güvenlik politikalarının tamamlanması

## 10. Katkı

Projeye katkı sağlamak isterseniz:

1. depoyu fork edin
2. bir branch oluşturun
3. geliştirmeleri yapın
4. pull request açın

## 11. Lisans

Bu proje lisans bilgisi için `package.json` dosyasındaki `license` alanını kontrol ediniz. Mevcut yapı `ISC` lisansına göre tanımlanmıştır.

---

Yukarıdaki README, projenin mevcut durumunu ve kullanım akışını anlaşılır şekilde anlatır. İsterseniz bir sonraki adımda bu dosyayı daha da düzenleyip:

- API endpoint tablosu ekleyebilir,
- Swagger benzeri açıklama ekleyebilir,
- proje için örnek `.env` ve Postman collection taslağı hazırlayabiliriz.
