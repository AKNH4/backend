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
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const getuser_decorator_1 = require("../../decorator/getuser.decorator");
const changePassword_dto_1 = require("../dto/changePassword.dto");
const sign_up_dto_1 = require("../dto/sign-up.dto");
const user_service_1 = require("../service/user.service");
const Login_dto_1 = require("../dto/Login.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUserData(user) {
        return (0, rxjs_1.of)(user);
    }
    signUp(dto) {
        return this.userService.signUp(dto);
    }
    login(dto) {
        return this.userService.login(dto).pipe((0, rxjs_1.map)((token) => ({ token })));
    }
    deleteUser(user) {
        return this.userService.deleteUser(user);
    }
    changePassword(user, dto) {
        return this.userService.changePassword(user.id, dto.password);
    }
};
__decorate([
    (0, common_1.Get)('/data'),
    (0, common_1.UseGuards)(auth_guard_1.default),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "getUserData", null);
__decorate([
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Login_dto_1.LoginDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.default),
    (0, common_1.Delete)('/delete'),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.default),
    (0, common_1.Post)('/change-password'),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, changePassword_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "changePassword", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map