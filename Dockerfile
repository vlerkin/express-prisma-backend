# Use the official Node.js image as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the application port
EXPOSE 6001

# Use CMD to specify the command to run the application
CMD ["node", "index.js"]