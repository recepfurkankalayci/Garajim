const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { globalLimiter, authLimiter } = require('./middleware/rateLimiter');
const swaggerUi = require('swagger-ui-express');

let swaggerDocument = {};
try {
  swaggerDocument = require('../swagger-output.json');
} catch (error) {
  console.warn('Swagger dosyası bulunamadı. Lütfen "npm run swagger" komutunu çalıştırın.');
}

const { errorHandler } = require('./middleware/errorHandle');
const CostumError = require('./utils/CostumError');
const carsRouter = require('./router/carsRouter');
const careRouter = require('./router/careRouter');
const userRouter = require('./router/userRouter');
const authRoutes = require('./router/authRouter');

const app = express();
const port = 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production' && Object.keys(swaggerDocument).length > 0) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.use(globalLimiter);



app.use('/araclar', carsRouter);
app.use('/bakimlar', careRouter);
app.use('/kullanicilar', userRouter);
app.use('/auth', authLimiter,authRoutes);

app.all('/{*splat}', (req, res, next) => {
    next(new CostumError(`Bu sunucuda ${req.originalUrl} adresi bulunamadı!`, 404));
});


app.use(errorHandler);

if(process.env.NODE_ENV !== "test"){
  app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde dinleniyor...`);
});
}

module.exports = app;
