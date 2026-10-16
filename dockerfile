FROM  node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN DATABASE_URL="postgresql://postgres:1234@db:5432/garajim?schema=public" npx prisma generate

COPY . .

EXPOSE 3000
CMD ["npm", "start"]