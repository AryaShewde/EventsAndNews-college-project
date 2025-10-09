# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 (default React build port)
EXPOSE 3000

# Start the app using serve package
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
