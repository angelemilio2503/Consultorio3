"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../database");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
// Ruta para registrar un nuevo usuario
router.post("/registrar", (0, express_async_handler_1.default)(async (req, res) => {
    const { nombre, usuario, contrasena } = req.body;
    try {
        const existeUsuario = await database_1.pool.query("SELECT * FROM users WHERE usuario = $1", [usuario]);
        if (existeUsuario.rows.length > 0) {
            res.status(400).json({ mensaje: "El usuario ya existe" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(contrasena, 10);
        await database_1.pool.query("INSERT INTO users (nombre, usuario, contrasena, rol) VALUES ($1, $2, $3, $4)", [nombre, usuario, hashedPassword, "Admin"]);
        res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}));
exports.default = router;
