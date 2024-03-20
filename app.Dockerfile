FROM node:18-alpine3.14

# COPY package*.json ./

# RUN npm install

# COPY . .

WORKDIR /app

COPY . .

# COPY ./dist ./dist

# EXPOSE 4000

RUN npm ci && npm run build && npm cache clean --force

CMD ["npm", "run", "start:dev"]