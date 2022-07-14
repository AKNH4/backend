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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../user/entity/user.entity");
let AuthService = class AuthService {
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    generateJWT(sub) {
        return (0, rxjs_1.from)(this.jwtService.signAsync({ sub }));
    }
    hashPassword(password) {
        return (0, rxjs_1.from)((0, bcrypt_1.hash)(password, 12));
    }
    comparePasswords(password, storedPassword) {
        return (0, rxjs_1.from)((0, bcrypt_1.compare)(password, storedPassword));
    }
    validateUser(username, password) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { username } })).pipe((0, rxjs_1.switchMap)((user) => {
            if (!user)
                throw new common_1.UnauthorizedException('Logindaten falsch');
            return this.comparePasswords(password, user.password).pipe((0, rxjs_1.map)((passwordMatch) => {
                if (passwordMatch) {
                    delete user.password;
                    return user;
                }
            }));
        }));
    }
    validateRequest(request) {
        var _a;
        let token = ((_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) ||
            request.query.token;
        if (!token)
            throw new common_1.UnauthorizedException('Token missing');
        return (0, rxjs_1.from)(this.jwtService.verifyAsync(token)).pipe((0, rxjs_1.switchMap)((decoded) => {
            return (0, rxjs_1.from)(this.userRepository.findOne({ where: { id: decoded.sub } })).pipe((0, rxjs_1.map)((user) => {
                if (!user)
                    throw new common_1.UnauthorizedException('Token no longer valid');
                delete user.password;
                request.user = user;
                return true;
            }));
        }), (0, rxjs_1.catchError)(() => {
            throw new common_1.UnauthorizedException('Token invalid');
        }));
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map