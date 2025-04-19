FROM node:19

# Install dependencies for building native modules (like bcrypt)
RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "dev"]