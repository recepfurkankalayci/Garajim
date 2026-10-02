const express = require('express');
const router = express.Router();

const{kulaniciGüncelle,kullaniciGetir,kullaniciSil,kullaniciolustur,kullaniciListele,kullaniciFiltrele}=require("../controller/userController");

router.get('/filtrele',kullaniciFiltrele);
router.get('/listele',kullaniciListele);
router.put("/:id",kulaniciGüncelle);
router.delete("/:id",kullaniciSil);
router.get('/:id',kullaniciGetir);
router.post('/olustur',kullaniciolustur);

module.exports=router;

