const carService = require('./carsServices');

exports.aracEkle = async(req,res)=>{
    try {
        const yeniArac = await carsService.aracEkle(req.body);
        res.status(201).json({mesaj : "araç oluşturuldu.",
            arac:yeniArac
        });
    } catch (error) {
      
        res.status(400).json({hata: "Araç eklenemedi, lütfen verileri kontrol ediniz"})
    }
}
exports.aracListele = async(_,res)=>{
    try {
        const araclar = await carsService.aracListele();
        res.status(200).json({mesaj:"Araçlar listelendi",
            araclar
        })
    } catch (error) {
        
        res.status(500).json({hata: "Araçlar listelenemedi, lütfen verileri kontrol ediniz"})
    }
}
 exports.aracGüncele  = async(req,res) =>{
    try {
        const guncellenenArac = await carsServices.aracGüncele(req.params.id, req.body);
        res.status(200).json({mesaj:"araç güncellendi", guncellenenArac})
    } catch (error) {
        console.error("Araç güncellenirken hata oluştu.",error);
        res.status(500).json({hata: "Araçlar güncellenemedi, lütfen verileri kontrol ediniz"})
    }
}
exports.aracSil = async(req,res) => {
try {
    const silinenArac = await carsServices.aracSil(req.params.id);
    res.status(200).json({mesaj : "araç başarıyla silindi"},
        silinenArac
    );
} catch (error) {
    if (error.message.includes("bulunamadı")) {
            return res.status(404).json({ hata: error.message });
        }
        res.status(400).json({ hata: error.message });
    
    }
}
exports.aracBul = async(req,res)=>{
    try {
    const filtrelenmisAraclar = await carService.aracBul(req.query);
    res.status(200).json({mesaj:"araç bulundu",filtrelenmisAraclar});
    } catch (error) {
    console.error("Araç bulunurken hata oluştu.",error);
    res.status(500).json({hata: "Araçlar bulunamadımedi, lütfen verileri kontrol ediniz"})
    }
}

exports.aracGetir = async(req,res)=>{
    try {
      const arananArac = await carService.aracGetir(req.params.id);
        res.status(200).json({mesaj : "araç bulundu",arananArac})
    } catch (error) {
        if (error.message.includes("bulunamadı")) {
            return res.status(404).json({ hata: error.message });
        }
        res.status(400).json({ hata: error.message });
    }
}
