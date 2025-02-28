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
const react_leaflet_1 = require("react-leaflet");
require("leaflet/dist/leaflet.css");
const leaflet_1 = __importDefault(require("leaflet"));
const axios_1 = __importDefault(require("axios"));
const material_1 = require("@mui/material");
// Definir un ícono personalizado para farmacias
const pharmacyIcon = new leaflet_1.default.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3916/3916651.png",
    iconSize: [30, 30],
});
const CityPharmacyMap = () => {
    // ✅ Usar useMemo para memorizar las coordenadas
    const cityCoords = (0, react_1.useMemo)(() => [25.1890, -99.8280], []);
    const [pharmacies, setPharmacies] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchPharmacies = () => __awaiter(void 0, void 0, void 0, function* () {
            const query = `
        [out:json];
        node["amenity"="pharmacy"](around:5000,${cityCoords[0]},${cityCoords[1]});
        out;
      `;
            const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
            try {
                const response = yield axios_1.default.get(url);
                setPharmacies(response.data.elements);
            }
            catch (error) {
                console.error("Error al obtener las farmacias:", error);
            }
        });
        fetchPharmacies();
    }, [cityCoords]); // ✅ cityCoords ya está memorizado, por lo que no se vuelve a crear
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { height: "100vh", width: "100%" }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", sx: { textAlign: "center", margin: 2 }, children: "Farmacias Cercanas en Montemorelos, Nuevo Le\u00F3n" }), (0, jsx_runtime_1.jsxs)(react_leaflet_1.MapContainer, { center: cityCoords, zoom: 13, style: { height: "500px", width: "100%" }, children: [(0, jsx_runtime_1.jsx)(react_leaflet_1.TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }), pharmacies.map((pharmacy, index) => {
                        var _a;
                        return ((0, jsx_runtime_1.jsx)(react_leaflet_1.Marker, { position: [pharmacy.lat, pharmacy.lon], icon: pharmacyIcon, children: (0, jsx_runtime_1.jsx)(react_leaflet_1.Popup, { children: ((_a = pharmacy.tags) === null || _a === void 0 ? void 0 : _a.name) || "Farmacia Desconocida" }) }, index));
                    })] })] }));
};
exports.default = CityPharmacyMap;
