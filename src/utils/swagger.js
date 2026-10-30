const fs = require('fs');
const path = require('path');
const swaggerPaths = require(path.resolve(__dirname, '..', '..', 'docs', 'swaggerPaths'));

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Garajım API',
    version: '1.0.0',
    description: 'Araç bakım ve takip sistemi API dokümantasyonu',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Geliştirme Sunucusu',
    },
  ],
  paths: swaggerPaths,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = path.resolve(__dirname, '..', '..', 'swagger-output.json');
fs.writeFileSync(outputFile, JSON.stringify(doc, null, 2));
console.log(`Swagger dokümanı başarıyla üretildi: ${outputFile}`);