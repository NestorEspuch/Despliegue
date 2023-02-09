import { UsuarioService } from './usuario.service';
export declare class AuthController {
    private readonly usuarioServices;
    constructor(usuarioServices: UsuarioService);
    mostrar(res: any): Promise<any>;
    mostrarRegistro(res: any): Promise<any>;
    cerrarSession(res: any, req: any): Promise<void>;
    login(res: any, req: any, body: any): Promise<void>;
    insertar(res: any, req: any, body: any): Promise<void>;
}
