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
const consultorio_jpg_1 = __importDefault(require("../../imagenes/consultorio.jpg"));
const framer_motion_1 = require("framer-motion");
// Animaciones de entrada y salida para la página completa
const pageTransition = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};
// Animación para el formulario
const formTransition = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
};
const Login = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [identifier, setIdentifier] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [role, setRole] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!identifier || !password || !role) {
            setError("Por favor, completa todos los campos");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const isEmail = /\S+@\S+\.\S+/.test(identifier);
            const loginData = isEmail
                ? { email: identifier, contrasena: password, rol: role }
                : { usuario: identifier, contrasena: password, rol: role };
            const response = yield axios_1.default.post("http://localhost:3000/auth/login", loginData, { headers: { "Content-Type": "application/json" } });
            const { token, usuario } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(usuario));
            alert(`Inicio de sesión exitoso, bienvenido ${usuario.nombre}`);
            navigate("/dashboard");
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                setError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.mensaje) || "Usuario, contraseña o rol incorrectos");
            }
            else {
                setError("Error desconocido al iniciar sesión.");
            }
        }
        finally {
            setIsLoading(false);
        }
    });
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                backgroundImage: `url(${consultorio_jpg_1.default})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }, children: (0, jsx_runtime_1.jsx)(material_1.Container, { maxWidth: "xs", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: formTransition, initial: "initial", animate: "animate", children: (0, jsx_runtime_1.jsxs)(material_1.Paper, { elevation: 5, sx: {
                            padding: 4,
                            textAlign: "center",
                            borderRadius: 3,
                            backgroundColor: "#FFFFFF",
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", sx: { color: "#0090FF", fontWeight: "bold", mb: 2 }, children: "Iniciar Sesi\u00F3n" }), error && (0, jsx_runtime_1.jsx)(material_1.Alert, { severity: "error", children: error }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Correo electr\u00F3nico o Usuario", margin: "normal", variant: "outlined", value: identifier, onChange: (e) => setIdentifier(e.target.value) }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Contrase\u00F1a", type: "password", margin: "normal", variant: "outlined", value: password, onChange: (e) => setPassword(e.target.value) }), (0, jsx_runtime_1.jsxs)(material_1.TextField, { fullWidth: true, select: true, label: "Rol", margin: "normal", variant: "outlined", value: role, onChange: (e) => setRole(e.target.value), children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: "Doctor", children: "Doctor" }), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: "Admin", children: "Admin" })] }), (0, jsx_runtime_1.jsx)(material_1.Button, { fullWidth: true, variant: "contained", sx: {
                                    mt: 3,
                                    bgcolor: "#0090FF",
                                    color: "#FFFFFF",
                                    "&:hover": { bgcolor: "#2ECC62" },
                                }, onClick: handleLogin, disabled: isLoading, children: isLoading ? (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 24, color: "inherit" }) : "Ingresar" })] }) }) }) }) }));
};
exports.default = Login;
