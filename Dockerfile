# Use the official Node.js image.
FROM node:latest

# Set environment variables.
ENV NODE_ENV=production
ENV PORT=8001

# Set the working directory.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available).
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the TypeScript code.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 8001

# Start the application.
CMD ["npm", "start"]
