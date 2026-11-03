# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "index.js"]
