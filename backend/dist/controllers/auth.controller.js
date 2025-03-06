"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_SECRET;
const iv = crypto_1.default.randomBytes(16);
// 🔐 Funciones de encriptación y desencriptación
const encrypt = (text) => {
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
};
const decrypt = (text) => {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts[0], "hex");
    const encryptedText = Buffer.from(textParts[1], "hex");
    const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
// 🔒 Login y generación de JWT con tipos correctos
const loginUser = async (req, res) => {
    try {
        const { usuario, contrasena, rol } = req.body;
        // Buscar usuario en la base de datos
        const result = await database_1.pool.query("SELECT * FROM users WHERE usuario = $1 AND rol = $2", [usuario, rol]);
        if (result.rows.length === 0) {
            res.status(401).json({ message: "Usuario o contraseña incorrecta" });
            return;
        }
        const user = result.rows[0];
        // Verificar contraseña
        const validPassword = await bcryptjs_1.default.compare(contrasena, user.contrasena);
        if (!validPassword) {
            res.status(401).json({ message: "Usuario o contraseña incorrecta" });
            return;
        }
        // Desencriptar el email
        const decryptedEmail = decrypt(user.email);
        // Generar JWT con opciones tipadas
        const jwtSecret = process.env.JWT_SECRET;
        const options = { expiresIn: "1h" };
        const token = jsonwebtoken_1.default.sign({ id: user.id, usuario: user.usuario, rol: user.rol }, jwtSecret, options);
        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token, // ✅ El token está permitido
            user: { id: user.id, usuario: user.usuario, rol: user.rol } // ❌ No se deben devolver datos sensibles como email cifrado
        });
    }
    catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.loginUser = loginUser;
