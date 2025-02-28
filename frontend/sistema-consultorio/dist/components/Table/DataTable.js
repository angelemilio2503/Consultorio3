"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const DataTable = ({ columns, data }) => {
    return ((0, jsx_runtime_1.jsx)(material_1.TableContainer, { component: material_1.Paper, children: (0, jsx_runtime_1.jsxs)(material_1.Table, { children: [(0, jsx_runtime_1.jsx)(material_1.TableHead, { children: (0, jsx_runtime_1.jsx)(material_1.TableRow, { children: columns.map((column) => ((0, jsx_runtime_1.jsx)(material_1.TableCell, { children: column.label }, column.id))) }) }), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: data.map((row) => ((0, jsx_runtime_1.jsx)(material_1.TableRow, { children: columns.map((column) => ((0, jsx_runtime_1.jsx)(material_1.TableCell, { children: row[column.id] }, column.id))) }, row.id))) })] }) }));
};
exports.default = DataTable;
