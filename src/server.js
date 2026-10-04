const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const cors = require('cors');
app.use(cors());

const carsRouter = require('./router/carsRouter');
app.use('/araclar',carsRouter);

const careRouter = require('./router/careRouter');
app.use('/bakimlar',careRouter);

const userRouter = require('./router/userRouter');
app.use('/kullanicilar',userRouter);

const authRoutes = require('./routes/authRouter');
app.use('/auth', authRoutes);
app.listen(port,( () => {console.log(`Sunucu http://localhost:${port} adresinde dinleniyor...`)}))

