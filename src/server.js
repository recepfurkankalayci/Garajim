const express = require('express');
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler');
const CustomError = require('./utils/CustomError');
const carsRouter = require('./router/carsRouter');
const careRouter = require('./router/careRouter');
const userRouter = require('./router/userRouter');
const authRoutes = require('./router/authRouter');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/araclar', carsRouter);
app.use('/bakimlar', careRouter);
app.use('/kullanicilar', userRouter);
app.use('/auth', authRoutes);

app.all('*', (req, res, next) => {
    next(new CustomError(`Bu sunucuda ${req.originalUrl} adresi bulunamadı!`, 404));
});


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde dinleniyor...`);
});
