// routes/citas.ts
import express from 'express';
import { pool } from '../database';

const router = express.Router();

// Obtener todas las citas
router.get('/citas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM citas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas', error });
  }
});

// Agregar una nueva cita
router.post('/citas', async (req, res) => {
  const { fecha, paciente_id, doctor_id, motivo, estado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO citas (fecha, paciente_id, doctor_id, motivo, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fecha, paciente_id, doctor_id, motivo, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error });
  }
});

export default router;
