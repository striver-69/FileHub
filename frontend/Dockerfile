# Stage 1: Build React App
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
# Copy our custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the build output to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
