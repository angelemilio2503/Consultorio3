"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const material_1 = require("@mui/material");
const CustomForm = ({ onSubmit, }) => {
    const { control, handleSubmit } = (0, react_hook_form_1.useForm)({
        defaultValues: { name: "", email: "" },
    });
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), children: [(0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "name", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, field, { label: "Nombre", fullWidth: true, margin: "normal" }))) }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "email", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, field, { label: "Correo electr\u00F3nico", fullWidth: true, margin: "normal" }))) }), (0, jsx_runtime_1.jsx)(material_1.Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, children: "Enviar" })] }));
};
exports.default = CustomForm;
