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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../../auth/service/auth.service");
const user_entity_1 = require("../entity/user.entity");
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    signUp(user) {
        user.username = user.username.toLowerCase();
        return this.usernameExists(user.username).pipe((0, rxjs_1.switchMap)((exists) => {
            if (!exists)
                return this.authService.hashPassword(user.password).pipe((0, rxjs_1.switchMap)((hash) => {
                    return (0, rxjs_1.from)(this.userRepository.save({
                        username: user.username,
                        password: hash,
                    })).pipe((0, rxjs_1.switchMap)((newUser) => {
                        return this.authService.generateJWT(newUser.id).pipe((0, rxjs_1.map)((token) => {
                            return {
                                token: token,
                                user: this.makeUserResponse(newUser),
                            };
                        }));
                    }));
                }));
            throw new common_1.BadRequestException('Benutzername gibts schon!');
        }));
    }
    login(dto) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { username: dto.username } })).pipe((0, rxjs_1.switchMap)((user) => {
            if (!user)
                throw new common_1.UnauthorizedException('Logindaten falsch');
            return this.authService
                .comparePasswords(dto.password, user.password)
                .pipe((0, rxjs_1.switchMap)((match) => {
                if (!match)
                    throw new common_1.UnauthorizedException('Logindaten falsch');
                return this.authService.generateJWT(user.id);
            }));
        }));
    }
    getUserById(id) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { id } })).pipe((0, rxjs_1.map)((user) => {
            if (!user)
                throw new common_1.NotFoundException('Benutzer gibts nich!!');
            return this.makeUserResponse(user);
        }));
    }
    findAll() {
        return (0, rxjs_1.from)(this.userRepository.find()).pipe((0, rxjs_1.map)((users) => {
            users.forEach(function (v) {
                delete v.password;
            });
            return users;
        }));
    }
    deleteUser(user) {
        return (0, rxjs_1.from)(this.userRepository.delete(user.id)).pipe((0, rxjs_1.map)((res) => {
            return { msg: 'Benutzer gelöscht!' };
        }), (0, rxjs_1.catchError)((err) => {
            throw new common_1.InternalServerErrorException('Failed!!!');
        }));
    }
    usernameExists(username) {
        username = username.toLowerCase();
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { username } })).pipe((0, rxjs_1.map)((user) => {
            if (user)
                return true;
            return false;
        }));
    }
    validateUser(username, password) {
        username = username.toLowerCase();
        return this.usernameExists(username).pipe((0, rxjs_1.switchMap)((exists) => {
            if (exists)
                return (0, rxjs_1.from)(this.userRepository.findOne({ where: { username } })).pipe((0, rxjs_1.switchMap)((user) => {
                    return this.authService
                        .comparePasswords(password, user.password)
                        .pipe((0, rxjs_1.map)((match) => {
                        if (match)
                            return this.makeUserResponse(user);
                        throw new common_1.BadRequestException('Falche Logindaten');
                    }));
                }));
            throw new common_1.BadRequestException('Falche Logindaten');
        }));
    }
    changePassword(userId, password) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { id: userId } })).pipe((0, rxjs_1.switchMap)((user) => {
            if (!user)
                throw new common_1.BadRequestException("Benutzer mit der id gibt's nicht");
            return (0, rxjs_1.from)(this.authService.hashPassword(password)).pipe((0, rxjs_1.switchMap)((hash) => {
                return (0, rxjs_1.from)(this.userRepository.update({ id: userId }, { password: hash })).pipe((0, rxjs_1.map)((res) => {
                    if (!res)
                        throw new common_1.InternalServerErrorException('OOps');
                    return { msg: 'Passwort geändert!' };
                }));
            }));
        }));
    }
    getUserData(userId) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { id: userId } })).pipe((0, rxjs_1.map)((user) => {
            delete user.password;
            return user;
        }));
    }
    makeUserResponse(user) {
        const { password } = user, res = __rest(user, ["password"]);
        return res;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map