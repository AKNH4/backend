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
    generateJWT(payload) {
        return (0, rxjs_1.from)(this.jwtService.signAsync(Object.assign({}, payload)));
    }
    hashPassword(password) {
        return (0, rxjs_1.from)((0, bcrypt_1.hash)(password, 12));
    }
    comparePasswords(password, storedPassword) {
        return (0, rxjs_1.from)((0, bcrypt_1.compare)(password, storedPassword));
    }
    async validateJwt(jwt) {
        try {
            const decoded = await this.jwtService.verify(jwt);
            const user = await this.userRepository.findOne({
                where: { id: decoded.id },
            });
            if (!user)
                return false;
            return decoded;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Token invalid');
        }
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