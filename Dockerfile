FROM node:18-alpine

ARG NUXT_UI_PRO_LICENSE
ENV NUXT_UI_PRO_LICENSE=$NUXT_UI_PRO_LICENSE

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN node --max-old-space-size=8000

COPY . .

RUN npm install npx

RUN npx prisma generate

RUN mkdir -p /app/media && chown -R node:node /app/media

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]