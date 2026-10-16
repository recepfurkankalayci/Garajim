FROM  node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/sahte_db" npx prisma generate

COPY . .

EXPOSE 3000
CMD ["npm", "start"]