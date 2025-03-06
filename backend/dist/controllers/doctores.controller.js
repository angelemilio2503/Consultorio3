"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDoctor = void 0;
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// ✅ Registrar un nuevo doctor
const registerDoctor = async (req, res) => {
    try {
        const { nombre, usuario, contrasena } = req.body;
        // Validación básica
        if (!nombre || !usuario || !contrasena) {
            res.status(400).json({ message: "Todos los campos son obligatorios." });
            return;
        }
        // Verificar si el usuario ya existe
        const existingDoctor = await database_1.pool.query("SELECT * FROM doctores WHERE usuario = $1", [usuario]);
        if (existingDoctor.rows.length > 0) {
            res.status(409).json({ message: "El usuario ya existe." });
            return;
        }
        // Encriptar la contraseña
        const hashedPassword = await bcryptjs_1.default.hash(contrasena, 10);
        // Insertar en la base de datos
        await database_1.pool.query("INSERT INTO doctores (nombre, usuario, contrasena, rol) VALUES ($1, $2, $3, $4)", [nombre, usuario, hashedPassword, "Doctor"]);
        res.status(201).json({ message: "Doctor registrado exitosamente." });
    }
    catch (error) {
        console.error("Error al registrar doctor:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
exports.registerDoctor = registerDoctor;
