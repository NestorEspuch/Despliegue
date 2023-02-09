import { JuegoDto } from './dto/juego-dto/juego-dto';
import { JuegoService } from './juego.service';
export declare class JuegoController {
    private readonly juegoService;
    constructor(juegoService: JuegoService);
    listar(res: any): Promise<void>;
    llevarForm(res: any, session: any): Promise<any>;
    editarJuego(res: any, id: any, session: any): Promise<any>;
    buscarPorId(res: any, id: string): Promise<any>;
    crear(crearJuegoDTO: JuegoDto, res: any): Promise<any>;
    actualizar(id: string, actualizarJuego: JuegoDto, res: any): Promise<any>;
    borrarJuego(res: any, id: string, session: any): Promise<any>;
}
