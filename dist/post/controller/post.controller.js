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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const getuser_decorator_1 = require("../../decorator/getuser.decorator");
const createpost_dto_1 = require("../dto/createpost.dto");
const post_service_1 = require("../service/post.service");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getAllPosts() {
        return this.postService.findAll();
    }
    createPost(dto, user) {
        return this.postService.createPost(dto, user);
    }
    delete(idParam, user) {
        return this.postService.deletePost(idParam, user);
    }
    getAllFromUser(user) {
        return this.postService.getAllFromUser(user);
    }
    getById(id) {
        return this.postService.getPostByIdWithComments(id);
    }
    uploadFile(file) {
        return file.filename;
    }
    getPostImage(res) { }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], PostController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.default),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createpost_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.default),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PostController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.default),
    (0, common_1.Get)('/get-all-from-user'),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PostController.prototype, "getAllFromUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], PostController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/profileimages',
            filename: (req, file, cb) => {
                cb(null, `${file.filename}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('/image/:id'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostImage", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map