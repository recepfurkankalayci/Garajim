const express = require('express');
const app = express();

const {aracEkle,aracBul,aracGüncele,aracListele,aracSil}=require("../controller/carsController");

app.put('/:id',aracGüncele);
app.get('/listele',aracListele);
app.get('/:id',aracBul);
app.post('/ekle',aracEkle);
app.delete('/:id',aracSil);


module.exports = {app};

