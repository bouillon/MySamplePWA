# Use Node.js base image
FROM node:20-alpine

# Copy your static files into the image
COPY . .

# Install http-server globally (optional, but using npx works fine without this)
RUN npm install -g http-server

# Expose the port http-server will use (default is 8080)
EXPOSE 8080
CMD ["npx", "http-server", ".", "-p", "8080"]
