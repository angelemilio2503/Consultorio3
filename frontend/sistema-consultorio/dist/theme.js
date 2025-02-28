"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@mui/material/styles");
const theme = (0, styles_1.createTheme)({
    palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#ff4081" },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
    },
});
exports.default = theme;
