# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de Vite
EXPOSE 5173

# Arrancar en modo desarrollo permitiendo conexiones externas (--host)
CMD ["npm", "run", "dev", "--", "--host"]