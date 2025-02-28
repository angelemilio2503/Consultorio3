"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledButton = void 0;
const styles_1 = require("@mui/material/styles");
const Button_1 = __importDefault(require("@mui/material/Button"));
exports.StyledButton = (0, styles_1.styled)(Button_1.default)(({ theme }) => ({
    padding: theme.spacing(1, 3),
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "16px",
    boxShadow: theme.shadows[2],
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));
