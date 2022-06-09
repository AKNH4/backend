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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const post_service_1 = require("../../post/service/post.service");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../entity/comment.entity");
let CommentService = class CommentService {
    constructor(commentRepsitory, postService) {
        this.commentRepsitory = commentRepsitory;
        this.postService = postService;
    }
    getCommentsByPostId(postId) {
        return (0, rxjs_1.from)(this.postService.getById(postId)).pipe((0, rxjs_1.switchMap)((post) => {
            if (!post)
                throw new common_1.BadRequestException('Post gibt es nicht');
            return (0, rxjs_1.from)(this.commentRepsitory.find({
                where: {
                    post: { id: postId },
                },
                loadRelationIds: { relations: ['creator'] },
                order: {
                    created_at: 'DESC',
                },
                take: 10,
            }));
        }));
    }
    createComment(user, dto) {
        return (0, rxjs_1.from)(this.postService.getById(dto.postId)).pipe((0, rxjs_1.switchMap)((post) => {
            if (!post)
                throw new common_1.BadRequestException('Post gibts nicht');
            return (0, rxjs_1.from)(this.commentRepsitory.save({
                text: dto.text,
                post: post,
                creator: user,
                creator_name: user.username,
            })).pipe((0, rxjs_1.map)((comment) => {
                delete comment.creator;
                delete comment.post;
                return comment;
            }));
        }));
    }
    async deleteCommentById(user, commentId) {
        const comment = await this.commentRepsitory.findOne({
            where: {
                id: commentId,
            },
            relations: ['creator'],
            loadRelationIds: { relations: ['creator'] },
        });
        if (!comment)
            throw new common_1.BadRequestException('Kommentar gibt es nicht');
        if (comment.creator !== user)
            throw new common_1.UnauthorizedException('Ist nicht dein Kommentar');
        await this.commentRepsitory.delete({ id: commentId, creator: user });
        return comment;
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => post_service_1.PostService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        post_service_1.PostService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map