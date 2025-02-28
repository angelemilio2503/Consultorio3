"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("La variable JWT_SECRET no está definida en el archivo .env");
}
// ✅ Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).json({ message: "Token no proporcionado" });
        return;
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token inválido o expirado" });
            return;
        }
        // Agregar datos decodificados al objeto `req`
        req.user = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
// ✅ Middleware para autorizar por rol (acepta múltiples roles)
const authorizeRole = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.rol)) {
            res.status(403).json({ message: "No tienes permiso para acceder a esta función" });
            return;
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
