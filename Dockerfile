# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

WORKDIR /app

# Copy necessary files from the build stage
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public

# Install only production dependencies
RUN npm install --production

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
