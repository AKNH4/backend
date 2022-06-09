"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const fs_1 = require("fs");
const helmet = require('helmet');
const cert = (0, fs_1.readFileSync)('/etc/letsencrypt/live/marasite.de/cert.pem');
const key = (0, fs_1.readFileSync)('/etc/letsencrypt/live/marasite.de/privkey.pem');
const ca = (0, fs_1.readFileSync)('/etc/letsencrypt/live/marasite.de/fullchain.pem');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions: {
            cert: cert,
            key: key,
            ca: ca,
        },
    });
    const PORT = 443;
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use(helmet());
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    await app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on port ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map