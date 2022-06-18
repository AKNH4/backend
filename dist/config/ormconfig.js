"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_entity_1 = require("../comment/entity/comment.entity");
const post_entity_1 = require("../post/entity/post.entity");
const user_entity_1 = require("../user/entity/user.entity");
const config = {
    type: 'sqlite',
    database: 'C:\\dev\\database.db',
    entities: ['dist/src/**/*.entity.js', user_entity_1.UserEntity, post_entity_1.PostEntity, comment_entity_1.CommentEntity],
    synchronize: true,
    migrations: ['src/dist/db/migrations/*.js'],
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map