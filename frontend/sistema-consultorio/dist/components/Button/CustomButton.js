"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const CustomButton = ({ label, onClick, variant = "contained", color = "primary", disabled = false, fullWidth = false, }) => {
    return ((0, jsx_runtime_1.jsx)(material_1.Button, { variant: variant, color: color, onClick: onClick, disabled: disabled, fullWidth: fullWidth, children: label }));
};
exports.default = CustomButton;
