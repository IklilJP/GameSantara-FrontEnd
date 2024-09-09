
# Step 1: Use an official Node.js runtime as a parent image
FROM node:20.16.0 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use a smaller image to serve the built application
FROM nginx:alpine

# Copy your custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Step 8: Copy the build output to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the port that Nginx will use
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
