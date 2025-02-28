"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Login_1 = __importDefault(require("../pages/Auth/Login"));
const Dashboard_1 = __importDefault(require("../pages/Dashboard/Dashboard"));
const ProjectManagement_1 = __importDefault(require("../pages/Projects/ProjectManagement"));
const Doctores_1 = __importDefault(require("../pages/Doctores/Doctores"));
const pacientes_1 = __importDefault(require("../pages/Pacientes/pacientes"));
const agregar_doctores_1 = __importDefault(require("../pages/Doctores/agregar-doctores"));
const a_adir_pacientes_1 = __importDefault(require("../pages/Pacientes/a\u00F1adir-pacientes"));
const CityPharmacyMap_1 = __importDefault(require("../pages/Map/CityPharmacyMap")); // Mapa de farmacias
const citas_1 = __importDefault(require("../pages/Projects/citas")); // Importar la nueva página
const crear_citas_1 = __importDefault(require("../pages/Projects/crear-citas")); // Importar el nuevo componente
const AppRoutes = () => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Login_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/crear-citas", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(crear_citas_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(Dashboard_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/citas", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(citas_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/projects", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(ProjectManagement_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/doctores", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(Doctores_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/pacientes", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(pacientes_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/agregar-doctor", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(agregar_doctores_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/a\u00F1adir-paciente", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(a_adir_pacientes_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/buscar-farmacia", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(CityPharmacyMap_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/departments", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)("h1", { children: "Departamentos" }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/patients", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)("h1", { children: "Pacientes" }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/" }) })] }) }));
};
// Componente para proteger las rutas privadas
const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    return isAuthenticated ? children : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/" });
};
exports.default = AppRoutes;
