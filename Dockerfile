FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "start"]
