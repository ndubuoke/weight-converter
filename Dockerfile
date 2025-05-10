# Base image for the Node.js server
FROM node:18-alpine

# Set working directory
WORKDIR /app

# First copy ONLY package files for optimal caching
COPY package*.json ./

# Install ALL dependencies (including express)
RUN npm install

# Copy rest of the app
COPY . .

# Build the React app
RUN npm run build

# Expose the port
EXPOSE 3000

# Run the Node.js server
CMD ["node", "server.js"]