FROM node:8-alpine

ENV PORT 4000

EXPOSE 4000

RUN mkdir -p /usr/bin/backend
WORKDIR /usr/bin/backend

COPY package.json /usr/bin/backend/
COPY src /usr/bin/backend/

VOLUME /usr/bin/backend/src/

RUN yarn

CMD ["yarn", "dev"]
