FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Expose port and start server
EXPOSE 4000
CMD ["npm", "run", "server"]
