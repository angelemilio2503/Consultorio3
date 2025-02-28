"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
//import backgroundImage from '../../imagenes/consultorio2.jpg'; // Asegúrate de que la ruta sea correcta
const projects = [
    { id: 1, name: 'Proyecto A', tasks: 5 },
    { id: 2, name: 'Proyecto B', tasks: 8 },
];
const ProjectManagement = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [isSearchVisible, setIsSearchVisible] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
            height: '100vh', // Ocupa toda la altura de la pantalla
            width: '100vw', // Ocupa toda la anchura de la pantalla
            // backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', // La imagen cubre toda la pantalla manteniendo la proporción
            backgroundPosition: 'center', // Centra la imagen
            backgroundRepeat: 'no-repeat', // Evita la repetición
        }, children: [(0, jsx_runtime_1.jsx)(material_1.AppBar, { position: "static", sx: { backgroundColor: 'rgb(0, 111, 191)' }, children: (0, jsx_runtime_1.jsxs)(material_1.Toolbar, { sx: { display: 'flex', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", sx: { color: '#FFFFFF', fontWeight: 'bold' }, children: "Gesti\u00F3n de Proyectos y Tareas" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: 'flex', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: '#FFFFFF' }, onClick: () => navigate('/dashboard'), children: "Dashboard Principal" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: '#FFFFFF' }, onClick: () => navigate("/doctores"), children: "Doctores" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: "#FFFFFF" }, onClick: () => navigate("/pacientes"), children: "Pacientes" }), (0, jsx_runtime_1.jsx)(material_1.Button, { sx: { color: '#FFFFFF' }, children: "Departamentos" })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.3s ease-in-out',
                                width: isSearchVisible ? '300px' : '50px',
                                backgroundColor: isSearchVisible ? 'white' : 'transparent',
                                borderRadius: 3,
                                padding: isSearchVisible ? '5px 10px' : '0px',
                            }, onMouseEnter: () => setIsSearchVisible(true), onMouseLeave: () => setIsSearchVisible(false), children: [(0, jsx_runtime_1.jsx)(material_1.IconButton, { children: (0, jsx_runtime_1.jsx)(Search_1.default, { sx: { color: isSearchVisible ? '#0090FF' : 'white' } }) }), isSearchVisible && ((0, jsx_runtime_1.jsx)(material_1.InputBase, { placeholder: "Buscar...", sx: {
                                        ml: 1,
                                        flex: 1,
                                        color: 'black',
                                        '& input': {
                                            padding: '5px',
                                        },
                                    } }))] })] }) }), (0, jsx_runtime_1.jsxs)(material_1.TableContainer, { component: material_1.Paper, sx: { mt: 4, p: 2, borderRadius: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", gutterBottom: true, sx: { textAlign: 'center', fontWeight: 'bold', color: '#0090FF' }, children: "Gesti\u00F3n de Proyectos y Tareas" }), (0, jsx_runtime_1.jsxs)(material_1.Table, { children: [(0, jsx_runtime_1.jsx)(material_1.TableHead, { children: (0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "ID" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Nombre del Proyecto" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Tareas" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Acciones" })] }) }), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: projects.map((project) => ((0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: project.id }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: project.name }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: project.tasks }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "primary", children: "Ver Detalles" }) })] }, project.id))) })] })] })] }));
};
exports.default = ProjectManagement;
