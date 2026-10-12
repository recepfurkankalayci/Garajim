const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });


const connectionString = process.env.DATABASE_URL;
if (typeof connectionString !== 'string' || connectionString.length === 0) {
  throw new Error('DATABASE_URL bulunamadı. Proje kökündeki .env dosyasını kontrol edin.');
}


const pool = new Pool({ connectionString });


const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


module.exports = prisma;