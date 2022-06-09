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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../service/auth.service");
let AuthGuard = class AuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            throw new common_1.UnauthorizedException('Token missing');
        const decoded = await this.authService.validateJwt(token);
        if (!decoded)
            throw new common_1.UnauthorizedException('Token no longer valid');
        request.user = Object.assign(Object.assign({}, decoded), { exp: undefined, iat: undefined });
        return request;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthGuard);
exports.default = AuthGuard;
//# sourceMappingURL=auth.guard.js.map