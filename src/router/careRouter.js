const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const care = require('../controller/careController');

router.use(authMiddleware);

router.get('/listele', care.bakimListele);
router.get('/filtrele', care.bakimFiltrele);
router.put('/:id', care.bakimguncelle);
router.post('/olustur', care.bakimolustur);
router.delete('/:id', care.bakimsil);
router.get('/:id', care.bakimGetir);

module.exports = router;
