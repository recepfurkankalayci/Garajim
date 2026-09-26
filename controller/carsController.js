const prisma = require('../database');

exports.aracEkle = async(req,res)=>{
    try {
        const {license_plate, brand, model, year, userID, gkm} = req.body;
        const yeniArac = await prisma.cars.create({
            data: {
                license_plate,
                brand,
                model : model,
                year,
                userID,
                gkm
            }
        });
        res.status(201).json({mesaj : "araç oluşturuldu.",
            arac:yeniArac
        });
    } catch (error) {
        console.error("Araç ekerken hata oluştu.",error);
        res.status(500).json({hata: "Araç eklenemedi, lütfen verileri kontrol ediniz"})
    }
}
exports.aracListele = async(_,res)=>{
    try {
        const aracListesi=await prisma.cars.findMany();
        res.status(200).json({mesaj:"Araçlar listelendi",
            araclar : aracListesi
        })
    } catch (error) {
        console.error("Araç listelenirken hata oluştu.",error);
        res.status(500).json({hata: "Araçlar listelenemedi, lütfen verileri kontrol ediniz"})
    }
}
 exports.aracGüncele  = async(req,res) =>{
    try {
        const aracID = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(aracID)) {
            return res.status(400).json({ hata: "Geçersiz araç ID." });
        }
        const {license_plate, brand, model, year,gkm} = req.body;

        const guncellenenArac = await prisma.cars.update({
            where:{id : aracID},
            data : {
                license_plate,
                brand,
                model,
                year,
                gkm
            }
        });
        res.status(200).json({mesaj:"araç güncellendi", arac: guncellenenArac})
    } catch (error) {
        console.error("Araç güncellenirken hata oluştu.",error);
        res.status(500).json({hata: "Araçlar güncellenemedi, lütfen verileri kontrol ediniz"})
    }
}
exports.aracSil = async(req,res) => {
try {
    const aracID = parseInt(req.params.id);

    const silinenArac = await prisma.cars.delete({
        where: {id : aracID}
    });
    res.status(200).json({mesaj:"araç silindi",silinenArac})

} catch (error) {
    console.error("Araç silinirken hata oluştu.",error);
    res.status(500).json({hata: "Araçlar silinemedi, lütfen verileri kontrol ediniz"})
}
}
exports.aracBul = async(req,res)=>{
    try {
       const { brand, model, license_plate, year } = req.query;

        const filtrelenmisAraclar = await prisma.cars.findMany({
            where: {
                brand: brand, 
                model: model, 
                license_plate: license_plate,
                year: year ? parseInt(year) : undefined 
            }
        });

    res.status(200).json({mesaj:"araç bulundu",filtrelenmisAraclar});
    } catch (error) {
    console.error("Araç bulunurken hata oluştu.",error);
    res.status(500).json({hata: "Araçlar bulunamadımedi, lütfen verileri kontrol ediniz"})
    }
}

exports.aracGetir = async(req,res)=>{
    try {
        const arananID = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(arananID)) {
            return res.status(400).json({ hata: "Geçersiz araç ID." });
        }
        const arananArac = await prisma.cars.findUnique({
            where : {id : arananID}
        })
        if (!arananArac) {
            return res.status(404).json({ hata: "Araç bulunamadı." });
        }
        res.status(200).json({mesaj : "araç bulundu",arananArac})
    } catch (error) {
        console.error("Araç bulunurken hata oluştu.",error);
        res.status(500).json({hata: "Araç bulunamadı, lütfen verileri kontrol ediniz"})
    }
}
