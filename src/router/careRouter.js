const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const care = require('../controller/careController');
const {careEkleShema,
    careGuncelleSchema,
    careIdSchema,
    careFiltreSchema
}=require("../validations/careValidation");

const {validate} = require("../middleware/validate");
router.use(authMiddleware);

router.get('/listele', care.bakimListele);
router.get('/filtrele',validate(careFiltreSchema,"query"), care.bakimFiltrele);
router.put('/:id',validate(careIdSchema,"params"),validate(careGuncelleSchema), care.bakimguncelle);
router.post('/olustur',validate(careEkleShema), care.bakimolustur);
router.delete('/:id',validate(careIdSchema,"params"), care.bakimsil);
router.get('/:id',validate(careIdSchema,"params"), care.bakimGetir);

module.exports = router;
