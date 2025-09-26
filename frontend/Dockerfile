###########################################################################################

# Stage 1: Build
FROM node:23.11.0-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve build
FROM node:23.11.0-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build-stage /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

###########################################################################################