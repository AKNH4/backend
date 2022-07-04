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
    findAll() {
        return (0, rxjs_1.from)(this.userRepository.find()).pipe((0, rxjs_1.map)((users) => users.map((user) => {
            delete user.password;
            return user;
        })));
    }
    signUp(dto) {
        dto.username = dto.username.toLowerCase();
        const { username, password } = dto;
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { username } })).pipe((0, rxjs_1.switchMap)((user) => {
            if (user)
                throw new common_1.BadRequestException('Benutzername gibt es schon');
            return this.authService.hashPassword(password).pipe((0, rxjs_1.switchMap)((passwordHash) => (0, rxjs_1.from)(this.userRepository.save({
                username,
                password: passwordHash,
            })).pipe((0, rxjs_1.switchMap)((newUser) => this.authService.generateJWT(newUser.id)))));
        }));
    }
    login(dto) {
        dto.username = dto.username.toLowerCase();
        const { username, password } = dto;
        return this.authService.validateUser(username, password).pipe((0, rxjs_1.switchMap)((user) => {
            if (!user)
                throw new common_1.UnauthorizedException('Logindaten falsch');
            return this.authService
                .generateJWT(user.id)
                .pipe((0, rxjs_1.map)((token) => token));
        }));
    }
    deleteUser(userId) {
        return (0, rxjs_1.from)(this.userRepository.delete(userId)).pipe((0, rxjs_1.map)(() => 'Benutzer gelöscht!'));
    }
    changePassword(id, dto) {
        const { password } = dto;
        return this.authService
            .hashPassword(password)
            .pipe((0, rxjs_1.switchMap)((passwordHash) => (0, rxjs_1.from)(this.userRepository.update({ id }, { password: passwordHash })).pipe((0, rxjs_1.map)(() => 'Passwort geändert'))));
    }
    updateProfileImage(id, imagePath) {
        return (0, rxjs_1.from)(this.userRepository.update({ id }, { imagePath })).pipe((0, rxjs_1.map)(() => 'Hochgeladen'));
    }
    findProfileImage(id) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { id } })).pipe((0, rxjs_1.map)((user) => user.imagePath));
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