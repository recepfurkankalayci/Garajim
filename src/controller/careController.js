const careServices = require('./care.service');

exports.bakimolustur = async (req,res)=>{
    try{
    const yeniBakim = await careService.bakimEkle(req.body);
    res.status(200).json({mesaj : "bakım oluşturuldu",yeniBakim});  
    } catch (error) {
        console.error(error);
        res.status(500).json("bakım oluşturulamadı. verilerinizi kontrol ediniz");
    }

}
exports.bakimsil = async (req,res)=>{
    try {  
      const silinenbakim = await careService.bakimSil(req.params.id);
      res.status(200).json({mesaj : "bakım silindi",silinenbakim});    
    } catch (error) {
        console.error(error);
        res.status(500).json("bakım silinemedi. verilerinizi kontrol ediniz");
    }
}

exports.bakimguncelle = async (req,res)=>{
    try {
       const guncellenenBakim = await careService.bakimGuncelle(req.params.id, req.body);      
       res.status(200).json({mesaj : "bakım güncellendi",guncellenenBakim});  
       } 
    catch (error) {
         console.error(error);
        res.status(500).json("bakım güncelenemedi. verilerinizi kontrol ediniz");
    }
}

exports.bakimListele = async (_,res)=>{
   try{ const bakimlar = await careService.bakimListele();
        res.status(200).json({mesaj: "bakımlar listelendi",bakimlar})
} catch (error) {
    console.error(error)
    res.status(500).json({mesaj:"bakımlar listelenemedi"})
}
}

exports.bakimFiltrele = async (req,res)=>{
    try {
        const bakim = await careServices.bakimguncelle(req.query)
        res.status(200).json({mesaj: "bakımlar filtelendi",filtrelenmisListe})
    } catch (error) {
     console.error(error)
        res.status(500).json({mesaj:"bakımlar listelenemedi"})
    }    
    }

    
    exports.bakimGetir = async(req,res)=>{
        try {
           const bakim = await careService.bakimGetir(req.params.id);
            res.status(200).json({mesaj : "bakım bulundu",bakim})
        } catch (error) {
            console.error("Bakım bulunurken hata oluştu.",error);
            res.status(500).json({hata: "bakım bulunamadı, lütfen verileri kontrol ediniz"})
        }
    }
