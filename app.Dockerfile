FROM node:18-alpine3.14

WORKDIR /app

COPY . .

RUN npm ci && npm run build && npm cache clean --force

CMD ["npm", "run", "start:dev"]