# Angular Docker Image; Multi-stage build courtesy of:
#  https://mherman.org/blog/dockerizing-an-angular-app/
### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:12.2.0 as build

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
RUN npm install -g @angular/cli@8.3.2

COPY . /app

## Build the angular app in production mode and store the artifacts in dist folder

RUN  ng build --prod --output-path=dist


### STAGE 2: Setup ###

FROM nginx:1.17-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]