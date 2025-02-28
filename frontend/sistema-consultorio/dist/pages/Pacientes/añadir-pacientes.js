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
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
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
const AñadirPaciente = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [formData, setFormData] = (0, react_1.useState)({
        nombre: "",
        edad: "",
        padecimientos: "",
        tipo_sangre: "",
        discapacidades: "",
        diagnostico: "",
    });
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [successMessage, setSuccessMessage] = (0, react_1.useState)(null);
    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    // Manejar envío del formulario
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        // Validación de campos obligatorios
        const { nombre, edad, padecimientos, tipo_sangre, discapacidades, diagnostico } = formData;
        if (!nombre || !edad || !padecimientos || !tipo_sangre || !discapacidades || !diagnostico) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No tienes acceso. Inicia sesión.");
                setLoading(false);
                return;
            }
            // Realizar la solicitud POST
            yield axios_1.default.post("http://localhost:3000/pacientes/agregar", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccessMessage("Paciente añadido exitosamente.");
            setTimeout(() => navigate("/pacientes"), 2000); // Redirige después de 2 segundos
        }
        catch (err) {
            setError("Error al añadir el paciente. Intenta nuevamente.");
        }
        finally {
            setLoading(false);
        }
    });
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }, children: (0, jsx_runtime_1.jsxs)(material_1.Paper, { elevation: 3, sx: { padding: 4, width: "500px", borderRadius: 3 }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", sx: { fontWeight: "bold", marginBottom: 2, textAlign: "center" }, children: "A\u00F1adir Nuevo Paciente" }), error && (0, jsx_runtime_1.jsx)(material_1.Alert, { severity: "error", sx: { mb: 2 }, children: error }), successMessage && (0, jsx_runtime_1.jsx)(material_1.Alert, { severity: "success", sx: { mb: 2 }, children: successMessage }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Nombre", name: "nombre", margin: "normal", value: formData.nombre, onChange: handleChange }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Edad", name: "edad", type: "number", margin: "normal", value: formData.edad, onChange: handleChange }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Padecimientos", name: "padecimientos", margin: "normal", value: formData.padecimientos, onChange: handleChange }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Tipo de Sangre", name: "tipo_sangre", margin: "normal", value: formData.tipo_sangre, onChange: handleChange }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Discapacidades", name: "discapacidades", margin: "normal", value: formData.discapacidades, onChange: handleChange }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Diagn\u00F3stico", name: "diagnostico", margin: "normal", value: formData.diagnostico, onChange: handleChange }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: buttonAnimation, whileHover: "whileHover", whileTap: "whileTap", children: (0, jsx_runtime_1.jsx)(material_1.Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, sx: { mt: 3 }, disabled: loading, children: loading ? (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 24, color: "inherit" }) : "Añadir Paciente" }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: buttonAnimation, whileHover: "whileHover", whileTap: "whileTap", children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "outlined", color: "secondary", fullWidth: true, sx: { mt: 2 }, onClick: () => navigate("/pacientes"), children: "Cancelar" }) })] })] }) }) }));
};
exports.default = AñadirPaciente;
