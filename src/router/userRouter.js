const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {validate} = require("../middleware/validate");
const adminMiddleware = require('../middleware/adminMiddleware');
const {profilGuncelleSchema,
       kullaniciIdSchema
} = require("../validations/userValidation");
const {
  kulaniciGüncelle,
  kullaniciGetir,
  kullaniciSil,
  kullaniciolustur,
  kullaniciListele,
  kullaniciFiltrele,
} = require('../controller/userController');

router.use(authMiddleware);

router.get('/filtrele',adminMiddleware, kullaniciFiltrele);
router.get('/listele',adminMiddleware, kullaniciListele);
router.post('/olustur',adminMiddleware, kullaniciolustur);
router.delete('/:id',adminMiddleware,validate(kullaniciIdSchema, 'params'), kullaniciSil);
router.get('/:id', adminMiddleware,validate(kullaniciIdSchema, 'params') ,kullaniciGetir);
router.put('/:id',adminMiddleware,validate(profilGuncelleSchema), kulaniciGüncelle);


module.exports = router;
