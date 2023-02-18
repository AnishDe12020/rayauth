# write a dockerfile that builds and starts an express server in apps/server (this is a turborepo monorepo). make sure to use PNPM and node v18

FROM node:18

WORKDIR /usr/src/app

# COPY ./apps/server/package.json ./apps/server/pnpm-lock.yaml ./

COPY ./apps/server ./

RUN npm install -g pnpm && pnpm install

EXPOSE 8080

RUN pnpm run build

CMD ["pnpm", "run", "start"]
