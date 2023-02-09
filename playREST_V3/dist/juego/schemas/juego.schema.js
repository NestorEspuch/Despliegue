"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuegoSchema = void 0;
const mongoose = require("mongoose");
const edicionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    anyo: {
        type: Number,
        required: false,
        min: 2000,
        max: 2022,
    },
});
exports.JuegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 6,
    },
    descripcion: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    jugadoresPermitido: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        enum: ['rol', 'escape', 'dados', 'fichas', 'cartas', 'tablero'],
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    imagen: {
        type: String,
        required: false,
    },
    ediciones: {
        type: [edicionSchema],
    },
});
//# sourceMappingURL=juego.schema.js.map