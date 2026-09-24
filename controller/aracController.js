const { PrismaClient } = require("@prisma/client");
const prisma =new PrismaClient();
const aracEkle = async(req,res)=>{
    try {
        const {plaka, marka, model, yil, kullaniciId} = req.body;
        const yeniArac = await prisma.cars.create({
            data: {
                plaka : plaka,
                marka : marka,
                model : model,
                yil : yil,
                kullaniciId : kullaniciId
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
const aracListele = async(req,res)=>{
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
        const aracID = parseInt(req.params.id);
        const {license_plate, brand, model, year} = req.body;

        const guncellenenArac = await prisma.cars.update({
            where:{id : aracID},
            data : {
                license_plate,
                brand,
                model,
                year
            }
        });
        res.status(200).json({mesaj:"araç güncellendi"},
            guncellenenArac
        )
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
module.exports={aracEkle,
    aracListele}