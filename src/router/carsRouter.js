const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  aracEkle,
  aracBul,
  aracGüncele,
  aracListele,
  aracSil,
  aracGetir,
} = require('../controller/carsController');

router.use(authMiddleware);

router.put('/:id', aracGüncele);
router.get('/listele', aracListele);
router.get('/filtrele', aracBul);
router.post('/ekle', aracEkle);
router.delete('/:id', aracSil);
router.get('/:id', aracGetir);

module.exports = router;
