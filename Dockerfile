FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

ENV NODE_ENV production
ENV PORT 3000
ENV MONGO_URL mongodb+srv://admin-aryaman:admin@cluster0.szu6rmx.mongodb.net/heliverse?retryWrites=true&w=majority
ENV JWT_SECRET myownsecret

# Command to run the application
CMD ["yarn", "start"]
