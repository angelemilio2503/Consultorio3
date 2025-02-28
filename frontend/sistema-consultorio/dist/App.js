"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const Dashboard_1 = __importDefault(require("./pages/Dashboard/Dashboard"));
const pacientes_1 = __importDefault(require("./pages/Pacientes/pacientes"));
const Doctores_1 = __importDefault(require("./pages/Doctores/Doctores"));
const Login_1 = __importDefault(require("./pages/Auth/Login"));
const a_adir_pacientes_1 = __importDefault(require("./pages/Pacientes/a\u00F1adir-pacientes")); // Importa el nuevo componente
require("leaflet/dist/leaflet.css");
require("./App.css");
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { mode: "wait", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/pacientes", element: (0, jsx_runtime_1.jsx)(pacientes_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/doctores", element: (0, jsx_runtime_1.jsx)(Doctores_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/pacientes", element: (0, jsx_runtime_1.jsx)(pacientes_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/a\u00F1adir-pacientes", element: (0, jsx_runtime_1.jsx)(a_adir_pacientes_1.default, {}) })] }) }) }));
}
exports.default = App;
