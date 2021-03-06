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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../entity/post.entity");
const entity_1 = require("../entity");
let PostService = class PostService {
    constructor(postRepository, commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }
    findAll() {
        return (0, rxjs_1.from)(this.postRepository.find({
            order: {
                created_at: 'DESC',
            },
            relations: ['creator'],
            loadRelationIds: { relations: ['creator'] },
        }));
    }
    createPost(dto, user) {
        return (0, rxjs_1.from)(this.postRepository.save({
            text: dto.text,
            title: dto.title,
            creator_name: user.username,
            creator: user,
        })).pipe((0, rxjs_1.map)((createdPost) => {
            delete createdPost.creator;
            return createdPost;
        }));
    }
    deletePost(postId, user) {
        return (0, rxjs_1.from)(this.postRepository.findOne({
            where: { id: postId },
            relations: ['creator'],
            loadRelationIds: { relations: ['creator'] },
        })).pipe((0, rxjs_1.switchMap)((post) => {
            if (!post)
                throw new common_1.NotFoundException('Post gibt es nicht');
            if (post.creator !== user.id)
                throw new common_1.BadRequestException('Ist nicth deiner!');
            return (0, rxjs_1.from)(this.postRepository.delete({ id: post.id, creator: user })).pipe((0, rxjs_1.map)(() => 'Gel??cht!'));
        }));
    }
    getUserPosts(user) {
        return (0, rxjs_1.from)(this.postRepository.find({
            where: { creator: { id: user.id } },
            order: {
                created_at: 'DESC',
            },
            relations: ['creator'],
            loadRelationIds: { relations: ['creator'] },
        }));
    }
    findPostComments(postId) {
        return (0, rxjs_1.from)(this.postRepository.findOne({
            where: {
                id: postId,
            },
        })).pipe((0, rxjs_1.switchMap)((post) => {
            if (!post)
                throw new common_1.NotFoundException('Post mit dieser id gibt es nicht');
            return (0, rxjs_1.from)(this.commentRepository.find({ where: { post: { id: postId } } })).pipe((0, rxjs_1.map)((comments) => (Object.assign(Object.assign({}, post), { comments: [...comments] }))));
        }));
    }
    updatePost(postId, dto) {
        return (0, rxjs_1.from)(this.postRepository.findOne({ where: { id: postId } })).pipe((0, rxjs_1.switchMap)((post) => {
            if (!post)
                throw new common_1.BadRequestException("Post mit dieser id gibt's nicht");
            return (0, rxjs_1.from)(this.postRepository.update({ id: postId }, { title: dto.title, text: dto.text })).pipe((0, rxjs_1.map)(() => 'Post aktualisiert'));
        }));
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entity_1.CommentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map