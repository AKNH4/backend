"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_module_1 = require("../post/post.module");
const post_service_1 = require("../post/service/post.service");
const post_entity_1 = require("../post/entity/post.entity");
const comment_controller_1 = require("./controller/comment.controller");
const comment_entity_1 = require("./entity/comment.entity");
const comment_service_1 = require("./service/comment.service");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([comment_entity_1.CommentEntity, post_entity_1.PostEntity]),
            (0, common_1.forwardRef)(() => post_module_1.PostModule),
        ],
        providers: [comment_service_1.CommentService, post_service_1.PostService],
        controllers: [comment_controller_1.CommentController],
        exports: [comment_service_1.CommentService],
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map