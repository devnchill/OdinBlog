FROM node:20-alpine
WORKDIR /blogapp

ENV NODE_ENV development

COPY apps/backend .

RUN yarn install --production=false

EXPOSE 8080
CMD ["yarn", "run", "dev"]

