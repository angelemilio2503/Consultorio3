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
const material_1 = require("@mui/material");
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
require("leaflet/dist/leaflet.css");
const react_calendar_1 = __importDefault(require("react-calendar")); // 📅 Importar el calendario
require("react-calendar/dist/Calendar.css");
const axios_1 = __importDefault(require("axios"));
const leaflet_1 = __importDefault(require("leaflet"));
// Definir un ícono personalizado para farmacias
const pharmacyIcon = new leaflet_1.default.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3916/3916651.png",
    iconSize: [30, 30],
});
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
const Dashboard = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [isSearchVisible, setIsSearchVisible] = (0, react_1.useState)(false);
    const [isMapOpen, setIsMapOpen] = (0, react_1.useState)(false);
    const [isCalendarOpen, setIsCalendarOpen] = (0, react_1.useState)(false);
    const [citaFechas, setCitaFechas] = (0, react_1.useState)([]);
    // Coordenadas de Montemorelos, Nuevo León
    const cityCoords = [25.1890, -99.8280];
    // Lista de farmacias en Montemorelos
    const pharmacyLocations = [
        { lat: 25.1885, lng: -99.8282, name: "Farmacia Guadalajara" },
        { lat: 25.1901, lng: -99.8275, name: "Farmacia Benavides" },
        { lat: 25.1859, lng: -99.8304, name: "Farmacia Similares" },
        { lat: 25.1914, lng: -99.8261, name: "Farmacia del Ahorro" },
    ];
    // Obtener citas pendientes desde la API
    (0, react_1.useEffect)(() => {
        const fetchCitas = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const token = localStorage.getItem("token");
                if (!token)
                    return;
                const response = yield axios_1.default.get("http://localhost:3000/api/citas", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const fechas = response.data
                    .filter((cita) => cita.estado === "pendiente")
                    .map((cita) => new Date(cita.fecha));
                setCitaFechas(fechas);
            }
            catch (error) {
                console.error("Error al obtener citas pendientes:", error);
            }
        });
        fetchCitas();
    }, []);
    // Función para marcar días con citas pendientes en el calendario
    const tileClassName = ({ date, view }) => {
        if (view === "month") {
            return citaFechas.some((citaDate) => date.getFullYear() === citaDate.getFullYear() &&
                date.getMonth() === citaDate.getMonth() &&
                date.getDate() === citaDate.getDate())
                ? "highlight"
                : null;
        }
    };
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                height: "100vh",
                width: "100vw",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }, children: [(0, jsx_runtime_1.jsx)(material_1.AppBar, { position: "static", sx: { backgroundColor: "rgb(0, 111, 191)" }, children: (0, jsx_runtime_1.jsxs)(material_1.Toolbar, { sx: { display: "flex", justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", sx: { color: "#FFFFFF", fontWeight: "bold" }, children: "Dashboard Principal" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", gap: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/citas"), children: "Gesti\u00F3n de Citas" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/doctores"), children: "Doctores" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/pacientes"), children: "Pacientes" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, children: "Departamentos" })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                    display: "flex",
                                    alignItems: "center",
                                    transition: "all 0.3s ease-in-out",
                                    width: isSearchVisible ? "300px" : "50px",
                                    backgroundColor: isSearchVisible ? "white" : "transparent",
                                    borderRadius: 3,
                                    padding: isSearchVisible ? "5px 10px" : "0px",
                                }, onMouseEnter: () => setIsSearchVisible(true), onMouseLeave: () => setIsSearchVisible(false), children: [(0, jsx_runtime_1.jsx)(material_1.IconButton, { children: (0, jsx_runtime_1.jsx)(Search_1.default, { sx: { color: isSearchVisible ? "#0090FF" : "white" } }) }), isSearchVisible && ((0, jsx_runtime_1.jsx)(material_1.InputBase, { placeholder: "Buscar...", sx: {
                                            ml: 1,
                                            flex: 1,
                                            color: "black",
                                            "& input": {
                                                padding: "5px",
                                            },
                                        } }))] })] }) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                        padding: 2,
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        mt: 1,
                    }, children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: buttonAnimation, whileHover: "whileHover", whileTap: "whileTap", children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "primary", onClick: () => navigate("/crear-citas"), children: "Crear una cita" }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: buttonAnimation, whileHover: "whileHover", whileTap: "whileTap", children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "primary", onClick: () => setIsCalendarOpen(true), children: "Verificar calendario" }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: buttonAnimation, whileHover: "whileHover", whileTap: "whileTap", children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "success", onClick: () => setIsMapOpen(true), children: "Buscar farmacias" }) })] }), (0, jsx_runtime_1.jsx)(material_1.Modal, { open: isCalendarOpen, onClose: () => setIsCalendarOpen(false), children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "50%",
                            height: "50%",
                            backgroundColor: "white",
                            boxShadow: 24,
                            borderRadius: 2,
                            padding: 2,
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h5", sx: { mb: 2, fontWeight: "bold" }, children: "Calendario de Citas Pendientes" }), (0, jsx_runtime_1.jsx)(react_calendar_1.default, { tileClassName: tileClassName })] }) })] }) }));
};
exports.default = Dashboard;
