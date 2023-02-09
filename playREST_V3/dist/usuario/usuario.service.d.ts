import { Model } from 'mongoose';
import { Usuario } from './interfaces/usuario.interface';
import { UsuarioDto } from './dto/usuario-dto/usuario-dto';
export declare class UsuarioService {
    private readonly usuarioModel;
    constructor(usuarioModel: Model<Usuario>);
    borrar(id: string): Promise<Usuario>;
    actualizar(id: string, actualizarUsuarioDto: UsuarioDto): Promise<Usuario>;
    insertar(crearUsuarioDto: UsuarioDto): Promise<Usuario>;
    buscarPorId(id: string): Promise<Usuario[]>;
    listar(): Promise<Usuario[]>;
}
