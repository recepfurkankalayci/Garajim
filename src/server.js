const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const carsRouter = require('./router/carsRouter');
app.use('/araclar', carsRouter);

const careRouter = require('./router/careRouter');
app.use('/bakimlar', careRouter);

const userRouter = require('./router/userRouter');
app.use('/kullanicilar', userRouter);

const authRoutes = require('./router/authRouter');
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde dinleniyor...`);
});

