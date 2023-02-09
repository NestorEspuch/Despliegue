import * as mongoose from 'mongoose';
export declare const JuegoSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    nombre: string;
    descripcion: string;
    edad: number;
    jugadoresPermitido: number;
    precio: number;
    ediciones: mongoose.Types.DocumentArray<{
        nombre: string;
        anyo?: number;
    }>;
    tipo?: "rol" | "escape" | "dados" | "fichas" | "cartas" | "tablero";
    imagen?: string;
}>;
