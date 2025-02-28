"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const framer_motion_1 = require("framer-motion");
// Animaciones
const pageTransition = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};
const buttonAnimation = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
};
const AgregarDoctor = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [doctor, setDoctor] = (0, react_1.useState)({
        nombre: "",
        cedula: "",
        especializacion: "",
        area: "",
        telefono: "",
    });
    const [error, setError] = (0, react_1.useState)(null);
    const handleChange = (e) => {
        setDoctor(Object.assign(Object.assign({}, doctor), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No tienes acceso. Inicia sesión.");
            return;
        }
        try {
            yield axios_1.default.post("http://localhost:3000/doctores/registrar", doctor, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });
            alert("Doctor agregado exitosamente.");
            navigate("/doctores"); // Redirige a la lista de doctores
        }
        catch (error) {
            console.error("Error:", error);
            setError("Error al agregar doctor. Inténtalo de nuevo.");
        }
    });
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }, children: (0, jsx_runtime_1.jsxs)(material_1.Paper, { elevation: 3, sx: { padding: 4, width: "400px", borderRadius: 3 }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h5", gutterBottom: true, sx: { textAlign: "center", fontWeight: "bold" }, children: "Agregar Doctor" }), error && (0, jsx_runtime_1.jsx)(material_1.Alert, { severity: "error", sx: { mb: 2 }, children: error }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Nombre", name: "nombre", margin: "normal", onChange: handleChange, required: true }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "C\u00E9dula", name: "cedula", margin: "normal", onChange: handleChange, required: true }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Especializaci\u00F3n", name: "especializacion", margin: "normal", onChange: handleChange, required: true }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "\u00C1rea", name: "area", margin: "normal", onChange: handleChange, required: true }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Tel\u00E9fono", name: "telefono", margin: "normal", onChange: handleChange, required: true }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: buttonAnimation, whileHover: "whileHover", whileTap: "whileTap", children: (0, jsx_runtime_1.jsx)(material_1.Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { mt: 2 }, children: "Guardar" }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: buttonAnimation, whileHover: "whileHover", whileTap: "whileTap", children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "outlined", color: "secondary", fullWidth: true, sx: { mt: 2 }, onClick: () => navigate("/doctores"), children: "Cancelar" }) })] })] }) }) }));
};
exports.default = AgregarDoctor;
