"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../database");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// ✅ Ruta para obtener todos los doctores desde la tabla doctores_users (Disponible para todos los roles autenticados)
router.get("/doctores_users", auth_middleware_1.verifyToken, (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const result = await database_1.pool.query("SELECT * FROM doctores_users");
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error al obtener los doctores:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}));
// ✅ Ruta para registrar un nuevo doctor directamente en doctores_users (solo Admin)
router.post("/registrar", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorizeRole)("Admin"), // Solo permite a usuarios con rol Admin
(0, express_async_handler_1.default)(async (req, res) => {
    const { nombre, cedula, especializacion, area, telefono } = req.body;
    if (!nombre || !cedula || !especializacion || !area || !telefono) {
        res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        return;
    }
    try {
        const existeDoctor = await database_1.pool.query("SELECT * FROM doctores_users WHERE cedula = $1", [cedula]);
        if (existeDoctor.rows.length > 0) {
            res.status(400).json({ mensaje: "Un doctor con esta cédula ya está registrado" });
            return;
        }
        await database_1.pool.query("INSERT INTO doctores_users (nombre, cedula, especializacion, area, telefono) VALUES ($1, $2, $3, $4, $5)", [nombre, cedula, especializacion, area, telefono]);
        res.status(201).json({ mensaje: "Doctor agregado exitosamente" });
    }
    catch (error) {
        console.error("Error al registrar doctor:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}));
// ✅ Ruta para eliminar un doctor por ID (solo Admin)
router.delete("/doctores_users/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorizeRole)("Admin"), // Solo permite a usuarios con rol Admin
(0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    try {
        const doctorExistente = await database_1.pool.query("SELECT * FROM doctores_users WHERE id = $1", [id]);
        if (doctorExistente.rows.length === 0) {
            res.status(404).json({ mensaje: "Doctor no encontrado" });
            return;
        }
        await database_1.pool.query("DELETE FROM doctores_users WHERE id = $1", [id]);
        res.status(200).json({ mensaje: "Doctor eliminado exitosamente" });
    }
    catch (error) {
        console.error("Error al eliminar doctor:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}));
exports.default = router;
