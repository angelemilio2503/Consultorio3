"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// Configuración de la conexión a PostgreSQL
const client = new pg_1.Client({
    host: "localhost",
    port: 5432,
    user: "postgres", // Cambia por tu usuario de PostgreSQL
    password: "Mtzlopez1092", // Cambia por tu contraseña
    database: "sistema_consultorio" // Cambia por el nombre de tu base de datos
});
client.connect()
    .then(() => console.log('Conectado a PostgreSQL'))
    .catch(err => console.error('Error de conexión', err));
exports.default = client;
