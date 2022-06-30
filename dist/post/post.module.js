"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_controller_1 = require("./controller/comment.controller");
const post_controller_1 = require("./controller/post.controller");
const comment_entity_1 = require("./entity/comment.entity");
const post_entity_1 = require("./entity/post.entity");
const post_repository_1 = require("./repository/post.repository");
const comment_service_1 = require("./service/comment.service");
const post_service_1 = require("./service/post.service");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([post_entity_1.PostEntity, comment_entity_1.CommentEntity, post_repository_1.PostRepository]),
        ],
        providers: [post_service_1.PostService, comment_service_1.CommentService],
        controllers: [post_controller_1.PostController, comment_controller_1.CommentController],
        exports: [post_service_1.PostService, comment_service_1.CommentService],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map