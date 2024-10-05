# Stage 1: Build the Angular application
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular app in production mode
# This will generate the output in the 'dist/reservation-en-ligne' directory
RUN npm run build -- --configuration production

# List the contents of the dist directory for verification
RUN ls -la /app/dist

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

# Remove the default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular app from the previous stage to Nginx's HTML directory
COPY --from=build /app/dist/reservation-en-ligne /usr/share/nginx/html

# Copy a custom Nginx configuration file to handle Angular routes
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
