# Use an official Node.js runtime as a parent image
FROM oven/bun:alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code to the working directory
COPY . .

# Build the react application
RUN bun vite build

# Start a new stage for serving the built files
FROM nginx:alpine

# Copy the built files from the build stage into the NGINX web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the NGINX web server
EXPOSE 80

# Start the NGINX web server
CMD ["nginx", "-g", "daemon off;"]
