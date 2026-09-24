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
    } catch (error) {
        console.error("Araç ekerken hata oluştu.",error);
        res.status(500).json({hata: "Araç eklenemedi, lütfen verileri kontrol ediniz"})
    }
}

module.exports={aracEkle}
