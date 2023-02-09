"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuegoController = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("@nestjs/platform-express/multer");
const juego_dto_1 = require("./dto/juego-dto/juego-dto");
const juego_service_1 = require("./juego.service");
let JuegoController = class JuegoController {
    constructor(juegoService) {
        this.juegoService = juegoService;
    }
    async listar(res) {
        await this.juegoService
            .listar()
            .then((juego) => {
            return res.render('public/listado_juegos', {
                juego: juego,
            });
        })
            .catch((e) => res.render('public/error', { error: 'Error en la aplicación: ' + e }));
    }
    async llevarForm(res, session) {
        if (session.usuario && session) {
            return res.render('admin/nuevo_juego');
        }
        else {
            return res.render('public/error', { error: 'No eres administrador' });
        }
    }
    async editarJuego(res, id, session) {
        try {
            if (session.usuario && session) {
                const juego = await this.juegoService.listarId(id.id);
                if (juego)
                    return res.render('admin/editar_juego', { juego: juego });
                else {
                    throw new Error();
                }
            }
            else {
                return res.render('public/error', { error: 'No eres administrador' });
            }
        }
        catch (e) {
            return res.render('public/error', {
                error: 'Error en la aplicación: ' + e,
            });
        }
    }
    async buscarPorId(res, id) {
        try {
            const juego = await this.juegoService.listarId(id);
            if (juego)
                return res.render('public/juego_ficha', { juego: juego });
            else {
                throw new Error();
            }
        }
        catch (e) {
            return res.render('public/error', {
                error: 'Error en la aplicación: ' + e,
            });
        }
    }
    async crear(crearJuegoDTO, res) {
        try {
            return this.juegoService
                .insertar(crearJuegoDTO)
                .then((juego) => {
                res.render('public/juego_ficha', { juego: juego });
            })
                .catch((e) => {
                return res.render('public/error', {
                    error: 'Error en la aplicación: ' + e,
                });
            });
        }
        catch (e) {
            return res.render('public/error', {
                error: 'Error en la aplicación: ' + e,
            });
        }
    }
    async actualizar(id, actualizarJuego, res) {
        try {
            const juego = await this.juegoService.listarId(id);
            const juegoEditar = await this.juegoService.actualizar(id, actualizarJuego);
            juegoEditar.imagen = juegoEditar.imagen
                ? juegoEditar.imagen
                : juego.imagen;
            if (juego)
                return res.redirect('/');
            else {
                throw new Error();
            }
        }
        catch (e) {
            return res.render('public/error', {
                error: 'Error en la aplicación: ' + e,
            });
        }
    }
    async borrarJuego(res, id, session) {
        if (!session.usuario)
            return res.render('public/iniciarSesion', {
                error: 'El usuario debe estar logueado',
            });
        try {
            await this.juegoService.borrar(id);
            return res.redirect('/');
        }
        catch (e) {
            res.render('public/error', { error: e });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)('/nuevo'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "llevarForm", null);
__decorate([
    (0, common_1.Get)('/editar/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "editarJuego", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('imagen')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [juego_dto_1.JuegoDto, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "crear", null);
__decorate([
    (0, common_1.Post)('editar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, juego_dto_1.JuegoDto, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Post)('borrar/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], JuegoController.prototype, "borrarJuego", null);
JuegoController = __decorate([
    (0, common_1.Controller)('Juegos'),
    __metadata("design:paramtypes", [juego_service_1.JuegoService])
], JuegoController);
exports.JuegoController = JuegoController;
//# sourceMappingURL=juego.controller.js.map