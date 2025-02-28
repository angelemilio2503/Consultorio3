"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg"); // Para PostgreSQL
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Configuración de la conexión a PostgreSQL
const client = new pg_1.Client({
    host: "localhost",
    port: 5432,
    user: "postgres", // Cambia por tu usuario de PostgreSQL
    password: "Mtzlopez1092", // Cambia por tu contraseña
    database: "sistema_consultorio" // Cambia por el nombre de tu base de datos
});
// Conectar a la base de datos PostgreSQL
client.connect().then(() => console.log("Conectado a PostgreSQL")).catch((err) => console.error("Error al conectar a PostgreSQL", err));
// Crear una instancia de Express
const app = (0, express_1.default)();
// Middleware para parsear JSON (puedes usar directamente `express.json()`)
app.use(express_1.default.json()); // Esto reemplaza a `bodyParser.json()`
// Ruta para login
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Buscar al usuario en la base de datos
        const result = yield client.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = result.rows[0];
        if (!user) {
            // Respuesta si el usuario no existe
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        // Comparar la contraseña
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            // Respuesta si la contraseña no coincide
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        // Generar el token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, "miSecreto", { expiresIn: "1h" });
        // Respuesta exitosa
        return res.json({ message: "Login exitoso", token });
    }
    catch (error) {
        console.error(error);
        // Respuesta para errores del servidor
        return res.status(500).json({ message: "Error en el servidor" });
    }
}));
// Importa las rutas de autenticación desde `authRoutes.ts`
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Asegúrate de tener este archivo de rutas
// Usar las rutas de autenticación bajo el prefijo `/api`
app.use('/api', authRoutes_1.default);
// Puerto donde se ejecutará el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
