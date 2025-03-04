"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const doctores_routes_1 = __importDefault(require("./routes/doctores.routes"));
const citas_1 = __importDefault(require("./routes/citas"));
const pacientes_routes_1 = __importDefault(require("./routes/pacientes.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// Cargar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// ✅ Configurar CORS correctamente
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Agrega ambos orígenes si el frontend cambia de puerto
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Asegura que se permitan los headers correctos
    credentials: true, // Permitir cookies si se usan
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json()); // Permite recibir datos en formato JSON
// ✅ Ruta de prueba para asegurar que el servidor funciona
app.get("/", (req, res) => {
    res.send("🚀 Servidor del sistema de consultorio funcionando correctamente.");
});
// ✅ Rutas de la API
app.use("/api/doctores", doctores_routes_1.default);
app.use("/api/citas", citas_1.default);
app.use("/api/pacientes", pacientes_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
// ✅ Conexión a la base de datos
database_1.pool
    .connect()
    .then(() => {
    console.log("✅ Conexión exitosa a PostgreSQL");
})
    .catch((err) => {
    console.error("❌ Error al conectar con PostgreSQL:", err);
});
// ✅ Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Error interno del servidor" });
});
// ✅ Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
