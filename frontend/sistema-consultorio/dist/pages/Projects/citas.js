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
const material_1 = require("@mui/material");
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
// Animaciones
const pageTransition = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};
const Citas = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [citas, setCitas] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [isSearchVisible, setIsSearchVisible] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchCitas = () => __awaiter(void 0, void 0, void 0, function* () {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No tienes acceso. Inicia sesión.");
                setLoading(false);
                return;
            }
            try {
                const response = yield axios_1.default.get("http://localhost:3000/api/citas", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCitas(response.data);
            }
            catch (_a) {
                setError("Error al obtener la lista de citas.");
            }
            finally {
                setLoading(false);
            }
        });
        fetchCitas();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: [(0, jsx_runtime_1.jsx)(material_1.AppBar, { position: "static", sx: { backgroundColor: "rgb(0, 111, 191)" }, children: (0, jsx_runtime_1.jsxs)(material_1.Toolbar, { sx: { display: "flex", justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", sx: { color: "#FFFFFF", fontWeight: "bold" }, children: "Gesti\u00F3n de Citas" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", gap: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/dashboard"), children: "Dashboard Principal" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/doctores"), children: "Doctores" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/pacientes"), children: "Pacientes" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, children: "Departamentos" })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
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
                                    } }))] })] }) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { padding: 4 }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", sx: { fontWeight: "bold", marginBottom: 2 }, children: "Lista de Citas" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "success", onClick: () => navigate("/crear-citas"), children: "Crear Cita" }) })] }), loading ? ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, {})) : error ? ((0, jsx_runtime_1.jsx)(material_1.Alert, { severity: "error", children: error })) : ((0, jsx_runtime_1.jsx)(material_1.TableContainer, { component: material_1.Paper, elevation: 3, children: (0, jsx_runtime_1.jsxs)(material_1.Table, { children: [(0, jsx_runtime_1.jsx)(material_1.TableHead, { children: (0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "ID" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Fecha" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "ID del Paciente" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "ID del Doctor" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Motivo" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Estado" })] }) }), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: citas.map((cita) => ((0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: cita.id }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: new Date(cita.fecha).toLocaleString() }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: cita.paciente_id }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: cita.doctor_id }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: cita.motivo }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: cita.estado })] }, cita.id))) })] }) }))] })] }));
};
exports.default = Citas;
