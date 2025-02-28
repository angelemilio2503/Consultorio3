"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController"); // Asegúrate de que la función `login` esté correctamente exportada
const router = express_1.default.Router();
// Ruta para manejar el login
router.post('/login', authController_1.login); // Aquí estamos vinculando el controlador `login`
exports.default = router;
