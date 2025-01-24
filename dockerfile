FROM node:22.13.0

WORKDIR /backpets

COPY . .

RUN npm install -g pnpm

RUN rm -rf  node_modules

RUN pnpm install

RUN pnpm dbuild

CMD ["pnpm", "start"]

EXPOSE 5002