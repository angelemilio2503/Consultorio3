"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/citas.ts
const express_1 = __importDefault(require("express"));
const database_1 = require("../database");
const router = express_1.default.Router();
// Obtener todas las citas
router.get('/citas', async (req, res) => {
    try {
        const result = await database_1.pool.query('SELECT * FROM citas');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener citas', error });
    }
});
// Agregar una nueva cita
router.post('/citas', async (req, res) => {
    const { fecha, nombre_paciente, nombre_doctor, motivo, estado } = req.body;
    try {
        const result = await database_1.pool.query('INSERT INTO citas (fecha, nombre_paciente, nombre_doctor, motivo, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *', [fecha, nombre_paciente, nombre_doctor, motivo, estado]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la cita', error });
    }
});
exports.default = router;
