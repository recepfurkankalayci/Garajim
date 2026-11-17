const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {aracEkleSchema,
  aracGuncelleSchema,
  aracIdSchema,
  aracFiltreSchema
} = require("../validations/carsValidation");

const {
  aracEkle,
  aracBul,
  aracGüncele,
  aracListele,
  aracSil,
  aracGetir,
} = require('../controller/carsController');

const { validate } = require('../middleware/validate');

router.use(authMiddleware);

router.put('/:id',validate(aracIdSchema,"params"),validate(aracGuncelleSchema), aracGüncele);
router.get('/listele', aracListele);
router.get('/filtrele',validate(aracFiltreSchema,"query"), aracBul);
router.post('/ekle',validate(aracEkleSchema), aracEkle);
router.delete('/:id',validate(aracIdSchema,"params"), aracSil);
router.get('/:id',validate(aracIdSchema,"params"), aracGetir);

module.exports = router;
