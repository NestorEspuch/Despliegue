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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
let AuthController = class AuthController {
    constructor(usuarioServices) {
        this.usuarioServices = usuarioServices;
    }
    async mostrar(res) {
        return res.render('public/iniciarSesion');
    }
    async mostrarRegistro(res) {
        return res.render('public/registro');
    }
    async cerrarSession(res, req) {
        try {
            req.session.destroy();
            res.redirect('/');
        }
        catch (e) {
            res.render('public/error', { error: 'Error en la aplicación: ' + e });
        }
    }
    async login(res, req, body) {
        const usuarios = await this.usuarioServices.listar();
        const usu = body.usuario;
        const pass = body.password;
        const existe = usuarios.filter((usuario) => usuario.login == usu && usuario && usuario.password == pass && usuario);
        if (existe.length > 0) {
            req.session.usuario = existe[0].login;
            res.redirect('/');
        }
        else {
            res.render('public/iniciarSesion', {
                error: 'Error usuario o contraseña incorrecta',
            });
        }
    }
    async insertar(res, req, body) {
        const usuarios = await this.usuarioServices.listar();
        const usu = body.usuario;
        const pass = body.password;
        const existe = usuarios.filter((usuario) => usuario.login == usu && usuario && usuario.password == pass && usuario);
        if (existe.length > 0) {
            res.render('public/registro', {
                error: 'Error: El usuario ya existe',
            });
        }
        else {
            this.usuarioServices
                .insertar({ login: usu, password: pass })
                .then(() => {
                req.session.usuario = usu;
                res.redirect('/');
            })
                .catch((e) => {
                res.render('public/registro', {
                    error: 'Error: ' + e,
                });
            });
        }
    }
};
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "mostrar", null);
__decorate([
    (0, common_1.Get)('register'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "mostrarRegistro", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "cerrarSession", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "insertar", null);
AuthController = __decorate([
    (0, common_1.Controller)('Auth'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=usuario.controller.js.map