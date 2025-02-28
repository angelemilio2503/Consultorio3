"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const index_1 = __importDefault(require("./routes/index"));
const doctores_routes_1 = __importDefault(require("./routes/doctores.routes"));
const pacientes_routes_1 = __importDefault(require("./routes/pacientes.routes"));
const citas_1 = __importDefault(require("./routes/citas"));
dotenv_1.default.config();
// ✅ Verificación de variables de entorno
if (!process.env.JWT_SECRET || !process.env.ENCRYPTION_SECRET) {
    console.error("❌ Error: Faltan variables de entorno requeridas.");
    process.exit(1);
}
console.log("✅ JWT_SECRET loaded:", process.env.JWT_SECRET ? "✔️ Loaded" : "❌ Not Loaded");
console.log("✅ ENCRYPTION_SECRET length:", ((_a = process.env.ENCRYPTION_SECRET) === null || _a === void 0 ? void 0 : _a.length) || "❌ Not Loaded");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// 🔒 Configuración de seguridad con Helmet
app.use((0, helmet_1.default)());
// 🔒 Configuración de rate limit
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 solicitudes por IP
    message: "🚫 Demasiadas solicitudes desde esta IP. Intenta de nuevo más tarde.",
});
app.use(limiter);
// 🛡️ Configuración de CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Actualiza esto según el frontend en producción
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
// 🚀 Habilitar el parsing de JSON
app.use(express_1.default.json());
// 📌 Definición de rutas
app.use("/auth", auth_routes_1.default);
app.use("/doctores", doctores_routes_1.default);
app.use("/pacientes", pacientes_routes_1.default);
app.use("/", index_1.default);
app.use('/api', citas_1.default);
// Permitir solicitudes desde localhost:5173
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
// 🛑 Middleware global para manejo de errores
app.use((err, req, res, next) => {
    console.error("🔥 Error detectado:", err.message);
    res.status(500).json({ message: "Error interno del servidor" });
});
// 🔥 Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
}).on("error", (err) => {
    console.error("❌ Error al iniciar el servidor:", err);
    process.exit(1);
});
