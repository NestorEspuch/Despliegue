import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    index(res: any): Promise<any>;
    listar(res: any, buscar: any): Promise<any>;
}
