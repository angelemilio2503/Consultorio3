"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTareas = exports.updateTareas = exports.createTareas = exports.getTareasById = exports.getTareas = exports.deletePacientes = exports.updatePacientes = exports.createPacientes = exports.getPacientesById = exports.getPacientes = exports.deleteDoctores = exports.updateDoctores = exports.createDoctores = exports.getDoctoresById = exports.getDoctores = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// 🔹 Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const response = await database_1.pool.query("SELECT * FROM users ORDER BY id ASC");
        res.status(200).json(response.rows);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getUsers = getUsers;
// 🔹 Obtener usuario por ID
const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await database_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(response.rows);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getUserById = getUserById;
// 🔹 Crear nuevo usuario
const createUser = async (req, res) => {
    const { nombre, usuario, contrasena, rol } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(contrasena, 10); // Cifrar la contraseña
    await database_1.pool.query("INSERT INTO users (nombre, usuario, contrasena, rol) VALUES ($1, $2, $3, $4)", [nombre, usuario, hashedPassword, rol]);
    res.json({
        message: "Usuario agregado exitosamente",
        body: {
            user: { nombre, usuario, rol }
        }
    });
};
exports.createUser = createUser;
// 🔹 Actualizar usuario
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, usuario, contrasena, rol } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(contrasena, 10);
    await database_1.pool.query("UPDATE users SET nombre = $1, usuario = $2, contrasena = $3, rol = $4 WHERE id = $5", [nombre, usuario, hashedPassword, rol, id]);
    res.json("Usuario actualizado correctamente");
};
exports.updateUser = updateUser;
// 🔹 Eliminar usuario
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await database_1.pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json(`Usuario ${id} eliminado exitosamente`);
};
exports.deleteUser = deleteUser;
// 🔹 Obtener todos los doctores
const getDoctores = async (req, res) => {
    try {
        const response = await database_1.pool.query("SELECT * FROM doctores ORDER BY id ASC");
        res.status(200).json(response.rows);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getDoctores = getDoctores;
// 🔹 Obtener doctor por ID
const getDoctoresById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await database_1.pool.query("SELECT * FROM doctores WHERE id = $1", [id]);
        res.json(response.rows); // ✅ Quitamos `return`
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getDoctoresById = getDoctoresById;
// 🔹 Crear nuevo doctor
const createDoctores = async (req, res) => {
    const { nombre, cedula, especializacion, area, telefono } = req.body;
    await database_1.pool.query("INSERT INTO doctores (nombre, cedula, especializacion, area, telefono) VALUES ($1, $2, $3, $4, $5)", [nombre, cedula, especializacion, area, telefono]);
    res.json({ message: "Doctor agregado correctamente" });
};
exports.createDoctores = createDoctores;
// 🔹 Actualizar doctor
const updateDoctores = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, cedula, especializacion, area, telefono } = req.body;
    await database_1.pool.query("UPDATE doctores SET nombre = $1, cedula = $2, especializacion = $3, area = $4, telefono = $5 WHERE id = $6", [nombre, cedula, especializacion, area, telefono, id]);
    res.json("Doctor actualizado correctamente");
};
exports.updateDoctores = updateDoctores;
// 🔹 Eliminar doctor
const deleteDoctores = async (req, res) => {
    const id = parseInt(req.params.id);
    await database_1.pool.query("DELETE FROM doctores WHERE id = $1", [id]);
    res.json(`Doctor ${id} eliminado correctamente`);
};
exports.deleteDoctores = deleteDoctores;
// 🔹 Controladores para Pacientes
const getPacientes = async (req, res) => {
    try {
        const response = await database_1.pool.query("SELECT * FROM pacientes ORDER BY id ASC");
        res.status(200).json(response.rows);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getPacientes = getPacientes;
const getPacientesById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await database_1.pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
        res.json(response.rows);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getPacientesById = getPacientesById;
const createPacientes = async (req, res) => {
    try {
        const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = req.body;
        await database_1.pool.query("INSERT INTO pacientes (nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico) VALUES ($1, $2, $3, $4, $5, $6)", [nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico]);
        res.status(201).json({ message: "Paciente agregado correctamente" });
    }
    catch (error) {
        console.error("Error al agregar paciente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.createPacientes = createPacientes;
const updatePacientes = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, edad, padecimientos, tipo_sangre, discapacidades } = req.body;
    await database_1.pool.query("UPDATE pacientes SET nombre = $1, edad = $2, padecimientos = $3, tipo_sangre = $4, discapacidades = $5 WHERE id = $6", [nombre, edad, padecimientos, tipo_sangre, discapacidades, id]);
    res.json("Paciente actualizado correctamente");
};
exports.updatePacientes = updatePacientes;
const deletePacientes = async (req, res) => {
    const id = parseInt(req.params.id);
    await database_1.pool.query("DELETE FROM pacientes WHERE id = $1", [id]);
    res.json(`Paciente ${id} eliminado correctamente`);
};
exports.deletePacientes = deletePacientes;
// 🔹 Controladores para Tareas y Proyectos
const getTareas = async (req, res) => {
    try {
        const response = await database_1.pool.query("SELECT * FROM tareas_proyectos ORDER BY id ASC");
        res.status(200).json(response.rows);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getTareas = getTareas;
const getTareasById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await database_1.pool.query("SELECT * FROM tareas_proyectos WHERE id = $1", [id]);
        res.json(response.rows);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getTareasById = getTareasById;
const createTareas = async (req, res) => {
    const { nombre_tarea, fecha_inicio, fecha_limite, descripcion } = req.body;
    await database_1.pool.query("INSERT INTO tareas_proyectos (nombre_tarea, fecha_inicio, fecha_limite, descripcion) VALUES ($1, $2, $3, $4)", [nombre_tarea, fecha_inicio, fecha_limite, descripcion]);
    res.json({ message: "Tarea agregada correctamente" });
};
exports.createTareas = createTareas;
const updateTareas = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre_tarea, fecha_inicio, fecha_limite, descripcion } = req.body;
    await database_1.pool.query("UPDATE tareas_proyectos SET nombre_tarea = $1, fecha_inicio = $2, fecha_limite = $3, descripcion = $4 WHERE id = $5", [nombre_tarea, fecha_inicio, fecha_limite, descripcion, id]);
    res.json("Tarea actualizada correctamente");
};
exports.updateTareas = updateTareas;
const deleteTareas = async (req, res) => {
    const id = parseInt(req.params.id);
    await database_1.pool.query("DELETE FROM tareas_proyectos WHERE id = $1", [id]);
    res.json(`Tarea ${id} eliminada correctamente`);
};
exports.deleteTareas = deleteTareas;
