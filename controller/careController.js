const { PrismaClient } = require("@prisma/client");
const prisma =new PrismaClient();

exports.bakimolustur = async (req,res)=>{
    const{header,hkm,transaction_date,cost}=req.body;
    try {    
        const bakim = await prisma.care.create({
        data : {
            header,
            hkm,
            transaction_date,
            cost
        }
    })
    res.status(200).json({mesaj : "bakım oluşturuldu",bakim});  
    } catch (error) {
        console.error(error);
        res.status(500).json("bakım oluşturulamadı. verilerinizi kontrol ediniz");
    }

}
exports.bakimsil = async (req,res)=>{
    try {  const bakmID = parseInt(req.params.id,10);
    const silinenbakim = await prisma.care.delete({
        where : {id:bakmID}
    })
      res.status(200).json({mesaj : "bakım silindi",silinenbakim});    
    } catch (error) {
        console.error(error);
        res.status(500).json("bakım silinemedi. verilerinizi kontrol ediniz");
    }
}

exports.bakimguncelle = async (req,res)=>{
    try {
       const bakmID = parseInt(req.params.id,10);
       if(isNaN(bakmID)){
       return res.status(400).json({ hata: "Geçersiz bakım ID." });
       }else{
       const{header,hkm,transaction_date,cost}=req.body;
       const guncelBakim= await prisma.care.update({where : {id : bakmID},
        data : {
            header,
            hkm,
            transaction_date,
            cost
        }
       })
         res.status(200).json({mesaj : "bakım güncellendi",guncelBakim});  
       }
    } catch (error) {
         console.error(error);
        res.status(500).json("bakım güncelenemedi. verilerinizi kontrol ediniz");
    }
}

exports.bakimListele = async (_,res)=>{
   try{ const liste = await prisma.care.findMany();
        res.status(200).json({mesaj: "bakımlar listelendi",liste})
} catch (error) {
    console.error(error)
    res.status(500).json({mesaj:"bakımlar listelenemedi"})
}
}

exports.bakimFiltrele = async (req,res)=>{
    try {const {header,hkm,transaction_date,cost} = req.query;
        const filtreler = {
            header: header,
            hkm: hkm ? parseInt(hkm, 10) : undefined,
           transaction_date: transaction_date ? new Date(transaction_date) : undefined,
            cost: cost ? parseInt(cost, 10) : undefined
        };
        const filtrelenmisListe = await prisma.care.findMany(
            {where : {filtreler}}
        )
        res.status(200).json({mesaj: "bakımlar filtelendi",filtrelenmisListe})
    } catch (error) {
     console.error(error)
        res.status(500).json({mesaj:"bakımlar listelenemedi"})
    }    
    }
