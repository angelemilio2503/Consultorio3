# Usa la imagen oficial de Node.js
FROM node:18

# Crea el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos (ya dentro de la carpeta correcta)
COPY . .

# Instala nodemon y ts-node globalmente
RUN npm install -g nodemon ts-node typescript

# Exponer el puerto del frontend (Vite usa 5173)
EXPOSE 5173

# Comando para desarrollo con hot reload (si usas Vite)
CMD ["npm", "run", "dev"]
