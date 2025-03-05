# Usar la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install --include=dev

# Copiar todo el código fuente
COPY . .

# Instalar nodemon globalmente para hot reload
RUN npm install -g nodemon

# Instalar TypeScript globalmente
RUN npm install -g typescript

# Compilar el código TypeScript
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación con hot reload
CMD ["npm", "run", "dev"]