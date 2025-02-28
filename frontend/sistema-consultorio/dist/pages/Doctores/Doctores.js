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
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
// Animaciones generales
const pageTransition = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};
// Animaciones para acciones de botones
const buttonAnimation = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
};
const Doctores = () => {
    const [doctores, setDoctores] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [isSearchVisible, setIsSearchVisible] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const fetchDoctores = () => __awaiter(void 0, void 0, void 0, function* () {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No tienes acceso. Inicia sesión.");
                setLoading(false);
                return;
            }
            try {
                const response = yield axios_1.default.get("http://localhost:3000/doctores/doctores_users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctores(response.data);
            }
            catch (_a) {
                setError("Error al obtener la lista de doctores.");
            }
            finally {
                setLoading(false);
            }
        });
        fetchDoctores();
    }, []);
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este doctor?");
        if (!confirmDelete)
            return;
        try {
            const token = localStorage.getItem("token");
            yield axios_1.default.delete(`http://localhost:3000/doctores/doctores_users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Doctor eliminado exitosamente.");
            setDoctores(doctores.filter((doctor) => doctor.id !== id));
        }
        catch (_a) {
            alert("Error al eliminar el doctor.");
        }
    });
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                height: "100vh",
                width: "100vw",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }, children: [(0, jsx_runtime_1.jsx)(material_1.AppBar, { position: "static", sx: { backgroundColor: "rgb(0, 111, 191)" }, children: (0, jsx_runtime_1.jsxs)(material_1.Toolbar, { sx: { display: "flex", justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", sx: { color: "#FFFFFF", fontWeight: "bold" }, children: "Gesti\u00F3n de Doctores" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", gap: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/dashboard"), children: "Dashboard Principal" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/citas"), children: "Gesti\u00F3n de Citas" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/pacientes"), children: "Pacientes" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, children: "Departamentos" })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
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
                                        } }))] })] }) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { padding: "20px" }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", children: "Lista de Doctores" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: buttonAnimation, whileHover: "whileHover", whileTap: "whileTap", children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "primary", onClick: () => navigate("/agregar-doctor"), children: "Agregar Doctor" }) })] }), loading ? ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, {})) : error ? ((0, jsx_runtime_1.jsx)(material_1.Alert, { severity: "error", children: error })) : ((0, jsx_runtime_1.jsx)(material_1.TableContainer, { component: material_1.Paper, children: (0, jsx_runtime_1.jsxs)(material_1.Table, { children: [(0, jsx_runtime_1.jsx)(material_1.TableHead, { children: (0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "ID" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Nombre" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "C\u00E9dula" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Especializaci\u00F3n" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "\u00C1rea" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Tel\u00E9fono" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Acciones" })] }) }), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: doctores.length > 0 ? (doctores.map((doctor) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.tr, { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 }, children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: doctor.id }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: doctor.nombre }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: doctor.cedula }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: doctor.especializacion }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: doctor.area }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: doctor.telefono }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { whileHover: { scale: 1.2 }, whileTap: { scale: 0.9 }, children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { color: "error", onClick: () => handleDelete(doctor.id), children: (0, jsx_runtime_1.jsx)(Delete_1.default, {}) }) }) })] }, doctor.id)))) : ((0, jsx_runtime_1.jsx)(material_1.TableRow, { children: (0, jsx_runtime_1.jsx)(material_1.TableCell, { colSpan: 7, style: { textAlign: "center" }, children: "No hay doctores registrados en la base de datos." }) })) })] }) }))] })] }) }));
};
exports.default = Doctores;
