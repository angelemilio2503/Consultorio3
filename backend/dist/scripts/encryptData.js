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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const crypto_util_1 = require("../utils/crypto.util");
const encryptExistingData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.pool.query("SELECT * FROM pacientes");
        for (const paciente of result.rows) {
            const encryptedNombre = (0, crypto_util_1.encrypt)(paciente.nombre || "");
            const encryptedPadecimientos = (0, crypto_util_1.encrypt)(paciente.padecimientos || "");
            const encryptedTipoSangre = (0, crypto_util_1.encrypt)(paciente.tipo_sangre || "");
            const encryptedDiscapacidades = (0, crypto_util_1.encrypt)(paciente.discapacidades || "");
            const encryptedDiagnostico = (0, crypto_util_1.encrypt)(paciente.diagnostico || "");
            yield database_1.pool.query("UPDATE pacientes SET nombre = $1, padecimientos = $2, tipo_sangre = $3, discapacidades = $4, diagnostico = $5 WHERE id = $6", [encryptedNombre, encryptedPadecimientos, encryptedTipoSangre, encryptedDiscapacidades, encryptedDiagnostico, paciente.id]);
        }
        console.log("✅ Todos los datos sensibles han sido cifrados con éxito.");
    }
    catch (error) {
        console.error("❌ Error al cifrar datos existentes:", error);
    }
    finally {
        yield database_1.pool.end(); // Cierra la conexión con la base de datos
    }
});
encryptExistingData();
