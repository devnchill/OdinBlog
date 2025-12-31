FROM node:20-alpine

WORKDIR /blogapp/apps/backend

ENV NODE_ENV development

COPY package.json ./

COPY . .

RUN yarn install --production=false  --frozen-lockfile


EXPOSE 8080

CMD ["sh", "./entrypoint.sh"]

