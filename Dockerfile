FROM node:22-slim

# Creamos el directorio de trabajo
WORKDIR /app

# Copiamos package.json y instalamos dependencias
COPY package*.json ./
RUN npm ci

# Copiamos el resto del código
COPY . .

# Hacemos build del frontend
RUN npm run build

# Exponemos el puerto
EXPOSE 3000

# El comando de inicio
CMD ["npm", "run", "start"]
