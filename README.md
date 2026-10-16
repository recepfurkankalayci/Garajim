# Garajım

> 🚧 **Not:** Bu proje şu an aktif geliştirme aşamasındadır (Work in Progress).

## Projenin Amacı
Garajım, araç sahiplerinin periyodik bakımlarını kolayca organize ve takip etmelerini sağlayan bir sistemdir.

Temel özellikleri şunlardır:
* **Periyodik Bakım Takibi:** Araçların farklı bakım ihtiyaçlarının (yağ, filtre, ağır bakım vb.) ne kadar süreyle ve kaç kilometre sonra yapılması gerektiğini belirler.
* **Servis ve Adres Rehberi:** Kullanıcıların işlemlerini gerçekleştirebilecekleri uygun sanayi/servis adreslerini gösterir.
* **Maliyet Bilgisi:** Gerçekleşmesi gereken bakımlar için ödenmesi gereken ücretleri belirtir.

## Kullanılan Teknolojiler
* JavaScript
* Node.js
* Prisma ORM

## Kurulum (Geliştirme Ortamı)
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. Repoyu bilgisayarınıza indirin:
```bash
git clone https://github.com/recepfurkankalayci/garajim.git
```

2. Proje dizinine girin ve gerekli paketleri yükleyin:
```bash
cd garajim
npm install
```

3. Ortam değişkenlerini oluşturup kendi değerlerinizi girin:
```bash
Copy-Item .env.example .env
```
`.env` dosyasındaki `DB_PASSWORD` değerini güçlü ve size özel bir parola ile değiştirin. Gerçek `.env` dosyasını GitHub'a göndermeyin; yalnızca `.env.example` dosyasını paylaşın.

4. Docker ile uygulamayı ve veritabanını başlatın:
```bash
docker compose up --build -d
```

Compose, uygulama konteynerinde veritabanı adresini `db` hizmet adına göre ayarlar. Yerel makinenizden Prisma komutları çalıştırırken `.env` içindeki `DATABASE_URL` adresinin `localhost:5432` kullandığından emin olun.