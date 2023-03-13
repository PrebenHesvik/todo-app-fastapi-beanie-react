# Use a Node 19 base image
FROM node:19-alpine

# Set the working directory to /src inside the container

WORKDIR /src

# Copy src files
COPY . .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install

# Build app
RUN npm run build

# Run app
EXPOSE 3000
CMD ["npm", "start"]