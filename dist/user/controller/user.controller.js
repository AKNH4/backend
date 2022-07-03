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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const getuser_decorator_1 = require("../../decorator/getuser.decorator");
const changePassword_dto_1 = require("../dto/changePassword.dto");
const signUp_dto_1 = require("../dto/signUp.dto");
const user_service_1 = require("../service/user.service");
const Login_dto_1 = require("../dto/Login.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.findAll();
    }
    getUserData(user, property) {
        return property ? (0, rxjs_1.of)({ [property]: user[property] }) : (0, rxjs_1.of)(user);
    }
    signUp(dto) {
        return this.userService.signUp(dto).pipe((0, rxjs_1.map)((token) => ({ token })));
    }
    login(dto) {
        return this.userService.login(dto).pipe((0, rxjs_1.map)((token) => ({ token })));
    }
    deleteUser(userId) {
        return this.userService
            .deleteUser(userId)
            .pipe((0, rxjs_1.map)((msg) => ({ msg })));
    }
    changePassword(userId, dto) {
        return this.userService
            .changePassword(userId, dto)
            .pipe((0, rxjs_1.map)((msg) => ({ msg })));
    }
};
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_2.Get)('/data'),
    (0, common_2.UseGuards)(auth_guard_1.default),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('p')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "getUserData", null);
__decorate([
    (0, common_2.Post)('/sign-up'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_dto_1.SignUpDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_2.Post)('/login'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Login_dto_1.LoginDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "login", null);
__decorate([
    (0, common_2.UseGuards)(auth_guard_1.default),
    (0, common_2.Delete)('/delete'),
    __param(0, (0, getuser_decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_2.UseGuards)(auth_guard_1.default),
    (0, common_2.Post)('/change-password'),
    __param(0, (0, getuser_decorator_1.GetUser)('id')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, changePassword_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "changePassword", null);
UserController = __decorate([
    (0, common_2.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map