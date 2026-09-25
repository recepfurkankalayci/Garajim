const { PrismaClient } = require("@prisma/client");
const prisma =new PrismaClient();

exports.kullaniciolustur =async(req,res)=>{
    try {   const {email,name}=req.body;
    const yeniKullanici = await prisma.user.create({
        data:
        {email,
        name}
    });
    res.status(201).json({mesaj: "kullanıcı oluşturuldu",yeniKullanici})
    } catch (error) {
        console.error(error)
        res.status(500).json({mesaj:"kullanıcı oluşturulamadı"})
    }
}
exports.kullaniciSil = async(req,res)=>{
    try {
        const kullaniciID =parseInt(req.params.id);
        const silinenKullanıcı = await prisma.user.delete({where : {id:kullaniciID}})
        res.status(200).json({mesaj: "kullanıcı silindi",silinenKullanici})
    } catch (error) {
        console.error(error)
        res.status(500).json({mesaj:"kullanıcı silinemedi"})
    }
}
exports.kullaniciListele = async(_,res)=>{
try {
    const kullaniciListesi = await prisma.user.findMany();
    res.status(200).json({mesaj: "kullanıcılar listelendi",kullaniciListesi})
} catch (error) {
    console.error(error)
        res.status(500).json({mesaj:"kullanıcılar listelenemedi"})
}
}
exports.kulaniciGüncelle= async(req,res)=>{
    try { const kullaniciID= parseInt(req.params.id);
        const {email,name}=req.body;
    const kullanici = await prisma.user.update({
        where:{id:kullaniciID},
        data:{
            email,
            name
        }
    })
        res.status(200).json({mesaj: "kullanıcı güncellendi",kullanici})
    } catch (error) {
        console.error(error)
        res.status(500).json({mesaj:"kullanıcı güncellenemedi"})
    }
}
exports.kullaniciFiltrele= async(req,res)=>{
    try {  
    const {email,name}=req.query;
    const filtrele = await prisma.user.findMany({
        where:{email,
        name}
    })
    res.status(200).json({mesaj: "kullanıcılar filtrelendi",filtrele})
    } catch (error) {
        console.error(error)
        res.status(500).json({mesaj:"kullanılar filtelenemedi"})
    }
}
exports.kullaniciGetir = async(req,res)=>{
    try {
    const arananID = req.params.id;
    const aranankullanici = prisma.cars.findUnique({
        where : {id : arananID}
    })
    res.status(200).json({mesaj : "kullanici bulundu",aranankullanici})
    } catch (error) {
        console.error("Bakım bulunurken hata oluştu.",error);
        res.status(500).json({hata: "bkullanici bulunamadı, lütfen verileri kontrol ediniz"})
    }
}