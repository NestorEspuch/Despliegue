"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nunjucks = require("nunjucks");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    nunjucks.configure('views', {
        autoescape: true,
        express: app,
    });
    app.use(session({
        secret: '1234',
        resave: true,
        saveUninitialized: false,
        expires: new Date(Date.now() + 30 * 60 * 1000),
    }));
    app.useStaticAssets(__dirname + '/../views', { prefix: 'public' });
    app.useStaticAssets(__dirname + '/../node_modules/bootstrap/dist');
    app.setViewEngine('njk');
    app.use((req, res, next) => {
        res.locals.session = req.session;
        next();
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map