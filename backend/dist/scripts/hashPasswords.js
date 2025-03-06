"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPasswords = async () => {
    try {
        const result = await database_1.pool.query("SELECT * FROM users");
        for (const users of result.rows) {
            const hashedPassword = await bcryptjs_1.default.hash(users.contrasena, 10);
            await database_1.pool.query("UPDATE users SET contrasena = $1 WHERE id = $2", [
                hashedPassword,
                users.id,
            ]);
        }
        console.log("Contraseñas actualizadas correctamente.");
    }
    catch (error) {
        console.error("Error al actualizar contraseñas:", error);
    }
};
hashPasswords();
